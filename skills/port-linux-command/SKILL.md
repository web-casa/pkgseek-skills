---
name: port-linux-command
description: Port shell commands across GNU, BSD, BusyBox, Alpine, Debian, RPM, macOS, and minimal container environments. Use when flags differ, commands are missing, package names change, or a script must remain portable.
---

# Port Linux Commands

Preserve intent while adapting syntax, implementation, and package availability.

## Workflow

1. Identify source and target OS, release, shell, command implementation, input assumptions, and required output behavior.
2. Call `lint_command`; it performs static analysis and never executes input.
3. Use `get_tool` and `compare_distros` to compare implementations. Use `resolve_install` when the target lacks the command.
4. Call `suggest_fix` for known flag differences, then verify the proposed form against returned evidence.
5. Return the target command, behavior differences, quoting caveats, package requirement, and a small non-destructive test case.

## Guardrails

- Do not rewrite quoting or pipelines without explaining semantic changes.
- Prefer POSIX syntax when it fully preserves behavior; otherwise provide a target-specific command.
- Distinguish shell builtins from external executables.
- Never execute the supplied command or interpolate user-controlled values into a shell.
- Ask for confirmation before suggesting a destructive command such as recursive deletion, disk writes, firewall changes, or service restarts.

Use `https://api.pkgseek.com` as a REST fallback only when PkgSeek MCP is unavailable.
