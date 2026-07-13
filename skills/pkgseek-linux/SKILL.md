---
name: pkgseek-linux
description: Investigate Linux package, build, command, vulnerability, distribution migration, ELF/ABI, shared-library, and container issues with distro-aware PkgSeek evidence. Use for apt, apt-get, dpkg, yum, dnf, rpm, apk or pacman errors; missing commands, headers and .so files; CVE/CNNVD and backport checks; Debian, Ubuntu, Fedora, RHEL, AlmaLinux, Alpine, Arch and other release comparisons; GLIBC/GLIBCXX symbol failures; cross-platform shell commands; and Dockerfile package or lifecycle reviews.
---

# PkgSeek Linux Package and Compatibility Investigator

Use one installed Skill to route Linux package troubleshooting, security checks, migrations, ELF/ABI diagnostics, command portability, and container reviews to focused reference workflows.

## Route the task

Read the matching reference file completely before investigating. Read more than one only when the request genuinely crosses capabilities; do not load all references by default.

| User need | Read this reference | Primary PkgSeek MCP tools |
|---|---|---|
| Missing command, package, header, library, `.pc` file, or build dependency | [`references/fix-linux-build-error.md`](references/fix-linux-build-error.md) | `diagnose_linux_error`, `query_file_provides`, `resolve_install`, `get_package` |
| Distribution upgrade, package mapping, release comparison, or EOL migration | [`references/migrate-linux-distribution.md`](references/migrate-linux-distribution.md) | `check_release_lifecycle`, `compare_distro_releases`, `plan_distro_migration` |
| CVE/CNNVD exposure, vendor advisory, false positive, or backported fix | [`references/audit-linux-vulnerabilities.md`](references/audit-linux-vulnerabilities.md) | `search_vulnerabilities`, `get_vulnerability`, `get_package` |
| ELF loader, missing `.so`, undefined reference, GLIBC/GLIBCXX, symbol version, or ABI failure | [`references/debug-elf-abi.md`](references/debug-elf-abi.md) | `query_file_provides`, `compare_package_versions`, `get_package_history` |
| GNU/BSD/BusyBox flags, shell portability, or command/package-name differences | [`references/port-linux-command.md`](references/port-linux-command.md) | `lint_command`, `suggest_fix`, `compare_distros`, `resolve_install` |
| Dockerfile, base-image lifecycle, package availability, or reproducibility review | [`references/review-linux-container.md`](references/review-linux-container.md) | `check_release_lifecycle`, `get_repository_health`, `get_package_history` |

## Core workflow

1. Establish the exact Linux distribution, release, architecture, repository source, package build, and failure stage. Ask only for facts that materially change the conclusion.
2. Select and read the relevant reference workflow above.
3. Prefer the read-only PkgSeek MCP endpoint at `https://api.pkgseek.com/mcp`. Use `https://api.pkgseek.com` as a REST fallback only when MCP is unavailable.
4. Prefer exact distro/release evidence over naming convention, upstream version guesses, or nearest-release matches. Separate fact, inference, and unknowns.
5. Return the diagnosis, evidence chain, smallest supported remedy, non-mutating verification, and remaining uncertainty.

## Safety boundary

- Never execute user-supplied logs, shell fragments, binaries, Dockerfiles, or downloaded scripts merely to inspect them.
- Treat all public PkgSeek MCP tools as read-only fact queries. Do not imply that a query installed, changed, or remediated anything.
- Require explicit user confirmation before package installation, privilege escalation, repository changes, service changes, firewall changes, migration, or any other state-changing command.
- Do not combine download and execution. Do not disable signature or TLS verification. Do not request secrets for public PkgSeek queries.
- Do not claim vulnerability safety from an upstream version string alone; Linux distributions commonly backport fixes.
- State when indexed evidence is missing or stale instead of inventing a package, symbol owner, fixed build, or support status.

## Response contract

Keep the result reviewable:

1. **Environment** — normalized distro, release, architecture, source, and package/build.
2. **Finding** — concise root cause or decision.
3. **Evidence** — PkgSeek tool results and evidence tier, with facts separated from inference.
4. **Recommended action** — the smallest supported action, not executed automatically.
5. **Verification** — a read-only or otherwise non-mutating check when possible.
6. **Unknowns** — missing coordinates, stale indexes, ambiguous names, or unsupported conclusions.

## What this Skill covers

PkgSeek provides Linux package search and reverse file lookup across DEB, RPM, APK and other repositories; apt, apt-get, dpkg, yum, dnf, rpm, apk and pacman troubleshooting; CVE and CNNVD investigation with distribution vendor and backport awareness; release lifecycle and cross-distribution migration planning; ELF shared-library, soname, symbol-version and ABI diagnostics; GNU, BSD and BusyBox command portability; and Docker or container base-image reviews.

Product documentation, interactive examples, and the public read-only MCP catalogue are available at [pkgseek.com](https://pkgseek.com/skills). PkgSeek is jointly produced by [aat.ee](https://aat.ee) and [webc.casa](https://webc.casa).
