# Lesson 38: Post-Compact Reminder with PCR

skills:
  - pcr
  - claude-code
  - context-management

---

# What is PCR?

Ever noticed Claude "forgetting" project rules after a long conversation? PCR fixes that.

**PCR (Post-Compact Reminder)** is a Claude Code hook that fires after context compaction. When Claude's conversation grows too long and the system compresses earlier messages, PCR automatically re-injects critical project context so Claude doesn't lose track of important rules and conventions.

---

# Checking Installation

PCR installs as a Claude Code hook. Check if it's active:

```bash
pcr --help
```

Or check your Claude Code settings for the hook entry.

---

# How It Works

PCR operates as a `Stop` hook in Claude Code:

1. Claude's context window fills up and compaction occurs
2. PCR detects the compaction event
3. PCR injects a reminder with key project context:
   - AGENTS.md rules
   - Active beads and priorities
   - File modification restrictions
   - Critical conventions

---

# Why PCR Matters

Without PCR, agents lose awareness of:

- "Never delete files without permission" rules
- Active task context and bead assignments
- Project-specific conventions (e.g., "use bun, never npm")
- Safety constraints like RCH offloading requirements

---

# Configuration

PCR reads from your project's AGENTS.md and CLAUDE.md to build the reminder. No manual configuration needed beyond installation.

---

# Common Scenarios

PCR runs automatically. You don't invoke it directly. It activates when:

- A long coding session triggers context compaction
- You resume a conversation after context was compressed
- The agent starts behaving as if it forgot project rules

---

# Summary

You've learned:
1. PCR is a Claude Code hook, not a manual command
2. It fires after context compaction to restore key context
3. It reads AGENTS.md and CLAUDE.md for project rules
4. It prevents agents from "forgetting" critical constraints
