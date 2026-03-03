#!/usr/bin/env bash
# ============================================================
# Unit tests for scripts/lib/github_api.sh
# Tests rate limit detection and backoff logic
#
# Related: bd-1lug
# ============================================================

set -euo pipefail

# Test directory setup
TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$TEST_DIR/../.." && pwd)"
LIB_DIR="$PROJECT_ROOT/scripts/lib"

# Source the library
source "$LIB_DIR/github_api.sh"

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Test helper
test_pass() {
    local name="$1"
    ((TESTS_PASSED++)) || true  # Avoid set -e failure when incrementing from 0
    echo -e "${GREEN}[PASS]${NC} $name"
}

test_fail() {
    local name="$1"
    local reason="${2:-}"
    ((TESTS_FAILED++)) || true  # Avoid set -e failure when incrementing from 0
    echo -e "${RED}[FAIL]${NC} $name"
    [[ -n "$reason" ]] && echo "       $reason"
}

run_test() {
    local name="$1"
    shift
    ((TESTS_RUN++)) || true  # Avoid set -e failure when incrementing from 0

    if "$@"; then
        test_pass "$name"
    else
        test_fail "$name" "Command returned non-zero"
    fi
}

# ============================================================
# Rate Limit Detection Tests
# ============================================================

test_rate_limit_403_with_body() {
    # Test: HTTP 403 with "rate limit" in body should be detected
    local body="API rate limit exceeded for user"
    if _is_rate_limited "403" "$body" ""; then
        return 0
    fi
    return 1
}

test_rate_limit_429() {
    # Test: HTTP 429 should be detected as rate limit
    if _is_rate_limited "429" "" "0"; then
        return 0
    fi
    return 1
}

test_rate_limit_remaining_zero() {
    # Test: X-RateLimit-Remaining: 0 should be detected
    if _is_rate_limited "403" "" "0"; then
        return 0
    fi
    return 1
}

test_rate_limit_abuse_detection() {
    # Test: "abuse detection" in body should be detected
    local body="You have triggered an abuse detection mechanism"
    if _is_rate_limited "403" "$body" ""; then
        return 0
    fi
    return 1
}

test_not_rate_limited_200() {
    # Test: HTTP 200 should NOT be rate limited
    if _is_rate_limited "200" "" ""; then
        return 1  # 200 should not be rate limited
    fi
    return 0
}

test_not_rate_limited_404() {
    # Test: HTTP 404 should NOT be rate limited
    if _is_rate_limited "404" "" ""; then
        return 1  # 404 should not be rate limited
    fi
    return 0
}

test_not_rate_limited_403_no_indicators() {
    # Test: HTTP 403 without rate limit indicators should NOT be detected
    local body="Bad credentials"
    if _is_rate_limited "403" "$body" "50"; then
        return 1  # Should not be rate limited (remaining > 0, no rate limit text)
    fi
    return 0
}

# ============================================================
# Reset Wait Time Tests
# ============================================================

test_reset_wait_time_valid() {
    # Test: Valid reset timestamp should return correct wait time
    local now future wait_time
    now=$(date +%s)
    future=$((now + 30))

    wait_time=$(_get_reset_wait_time "$future")

    # Should be approximately 31 (30 + 1 for safety)
    if [[ "$wait_time" -ge 28 && "$wait_time" -le 35 ]]; then
        return 0
    fi
    echo "Expected ~31, got $wait_time" >&2
    return 1
}

test_reset_wait_time_past() {
    # Test: Past timestamp should return max backoff
    local past wait_time
    past=$(($(date +%s) - 100))

    wait_time=$(_get_reset_wait_time "$past")

    if [[ "$wait_time" == "$GITHUB_BACKOFF_MAX" ]]; then
        return 0
    fi
    echo "Expected $GITHUB_BACKOFF_MAX, got $wait_time" >&2
    return 1
}

test_reset_wait_time_invalid() {
    # Test: Invalid timestamp should return max backoff
    local wait_time
    wait_time=$(_get_reset_wait_time "invalid")

    if [[ "$wait_time" == "$GITHUB_BACKOFF_MAX" ]]; then
        return 0
    fi
    echo "Expected $GITHUB_BACKOFF_MAX, got $wait_time" >&2
    return 1
}

# ============================================================
# Integration Tests (require network)
# ============================================================

test_fetch_valid_url() {
    # Test: Fetch a known good URL should succeed
    local tmp_file
    tmp_file=$(mktemp)
    # shellcheck disable=SC2064
    trap "rm -f '$tmp_file'" RETURN

    # Use a small, stable GitHub file
    if github_fetch_with_backoff "https://raw.githubusercontent.com/Dicklesworthstone/beads_rust/main/README.md" "$tmp_file" "test" 2>/dev/null; then
        if [[ -s "$tmp_file" ]]; then
            return 0
        fi
    fi
    return 1
}

test_fetch_invalid_url() {
    # Test: Fetch non-existent URL should fail with exit code 2
    local tmp_file status=0
    tmp_file=$(mktemp)
    # shellcheck disable=SC2064
    trap "rm -f '$tmp_file'" RETURN

    github_fetch_with_backoff "https://api.github.com/repos/nonexistent-user-12345/nonexistent-repo-67890/contents" "$tmp_file" "test" 2>/dev/null || status=$?

    if [[ "$status" == "2" ]]; then
        return 0
    fi
    echo "Expected exit code 2, got $status" >&2
    return 1
}

test_fetch_valid_url_without_base_args() {
    # Regression test: github_fetch_with_backoff should still work when
    # ACFS_CURL_BASE_ARGS is unset.
    local tmp_file status=1 had_base_args=false
    local -a saved_base_args=()
    tmp_file=$(mktemp)

    if declare -p ACFS_CURL_BASE_ARGS &>/dev/null; then
        had_base_args=true
        saved_base_args=("${ACFS_CURL_BASE_ARGS[@]}")
        unset ACFS_CURL_BASE_ARGS
    fi

    if github_fetch_with_backoff "https://raw.githubusercontent.com/Dicklesworthstone/beads_rust/main/README.md" "$tmp_file" "test" 2>/dev/null; then
        if [[ -s "$tmp_file" ]]; then
            status=0
        fi
    fi

    if [[ "$had_base_args" == "true" ]]; then
        ACFS_CURL_BASE_ARGS=("${saved_base_args[@]}")
    else
        unset ACFS_CURL_BASE_ARGS 2>/dev/null || true
    fi

    rm -f "$tmp_file"
    return "$status"
}

# ============================================================
# Main
# ============================================================

main() {
    echo "============================================================"
    echo "GitHub API Rate Limit Backoff Tests"
    echo "============================================================"
    echo ""

    echo "--- Rate Limit Detection ---"
    run_test "403 with rate limit body" test_rate_limit_403_with_body
    run_test "429 response" test_rate_limit_429
    run_test "X-RateLimit-Remaining: 0" test_rate_limit_remaining_zero
    run_test "Abuse detection" test_rate_limit_abuse_detection
    run_test "200 not rate limited" test_not_rate_limited_200
    run_test "404 not rate limited" test_not_rate_limited_404
    run_test "403 without indicators" test_not_rate_limited_403_no_indicators

    echo ""
    echo "--- Reset Wait Time ---"
    run_test "Valid future timestamp" test_reset_wait_time_valid
    run_test "Past timestamp" test_reset_wait_time_past
    run_test "Invalid timestamp" test_reset_wait_time_invalid

    # Skip network tests if SKIP_NETWORK_TESTS is set
    if [[ "${SKIP_NETWORK_TESTS:-}" != "true" ]]; then
        echo ""
        echo "--- Network Integration ---"
        run_test "Fetch valid URL" test_fetch_valid_url
        run_test "Fetch invalid URL" test_fetch_invalid_url
        run_test "Fetch valid URL without ACFS_CURL_BASE_ARGS" test_fetch_valid_url_without_base_args
    else
        echo ""
        echo "(Skipping network tests - SKIP_NETWORK_TESTS=true)"
    fi

    echo ""
    echo "============================================================"
    echo "Results: $TESTS_PASSED/$TESTS_RUN passed"

    if [[ $TESTS_FAILED -gt 0 ]]; then
        echo -e "${RED}$TESTS_FAILED test(s) failed${NC}"
        return 1
    else
        echo -e "${GREEN}All tests passed${NC}"
        return 0
    fi
}

main "$@"
