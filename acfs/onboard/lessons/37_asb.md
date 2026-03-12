# Lesson 37: Agent Settings Backup with ASB

skills:
  - asb
  - configuration
  - backup

---

# What is ASB?

Ever set up Claude Code, Codex, and Gemini with perfect configurations, then lost them during a reinstall? ASB prevents that.

**ASB (Agent Settings Backup)** creates git-versioned snapshots of all your AI agent configurations. It backs up settings, hooks, MCP configs, CLAUDE.md files, and custom keybindings across all supported agents.

---

# Checking Installation

Verify ASB is installed:

```bash
asb --help
```

---

# Backing Up Everything

Create a full backup of all agent settings:

```bash
asb backup --all
```

This captures configurations for Claude Code, Codex CLI, Gemini CLI, and any other supported agents.

---

# Restoring Settings

After a fresh install, restore your configurations:

```bash
asb restore --all
```

This applies backed-up settings to each agent's configuration directory.

---

# Why ASB Matters for Agents

When managing a fleet of VPS machines or reinstalling tools, ASB ensures:

- Consistent agent configurations across machines
- No manual re-configuration after updates
- Version history of settings changes
- Quick recovery from accidental config corruption

---

# Common Scenarios

```bash
# Back up all agent settings
asb backup --all

# See what's changed since last backup
asb diff

# Restore to a specific backup version
asb restore --version latest

# Back up only Claude Code settings
asb backup claude-code
```

---

# Summary

You've learned:
1. **asb backup** - Snapshot agent configurations
2. **asb restore** - Apply backed-up settings
3. **asb diff** - See configuration changes
4. How git-versioned backups protect your agent setup
