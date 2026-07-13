# PkgSeek Linux Agent Skill — Packages, CVEs, ELF/ABI, and Distro Migration

[![Validate Skill](https://github.com/web-casa/pkgseek-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/web-casa/pkgseek-skills/actions/workflows/validate.yml)

One open Agent Skill with six focused reference workflows for Linux package troubleshooting, distribution migration, vulnerability triage, ELF/ABI debugging, shell command portability, and container review. Install `pkgseek-linux` once; the agent loads only the reference needed for the current task.

PkgSeek combines a reviewable `SKILL.md` workflow with the read-only PkgSeek MCP fact layer at `https://api.pkgseek.com/mcp`. Explore the product, rendered source, and interactive examples at [pkgseek.com/skills](https://pkgseek.com/skills).

PkgSeek is jointly produced by [aat.ee](https://aat.ee) and [webc.casa](https://webc.casa).

## Install once with `npx skills`

Inspect the repository before installing:

```bash
npx skills add https://github.com/web-casa/pkgseek-skills --list
```

Install the complete Skill for the current project:

```bash
npx skills add https://github.com/web-casa/pkgseek-skills --skill pkgseek-linux
```

Install globally for Codex without prompts:

```bash
npx --yes skills add https://github.com/web-casa/pkgseek-skills \
  --skill pkgseek-linux \
  --global \
  --agent codex \
  --yes
```

The installed `pkgseek-linux` directory includes `SKILL.md`, all six files in `references/`, and `agents/openai.yaml`. Do not copy `SKILL.md` alone.

## Give this prompt to an AI Agent

Copy the complete prompt below into Codex, Claude Code, Cursor, or another shell-capable Agent:

```text
Install this Agent Skill for me.

Skill page: https://pkgseek.com/skills/pkgseek-linux
Source URL: https://github.com/web-casa/pkgseek-skills/tree/main/skills/pkgseek-linux
Skill name: pkgseek-linux
Creator: web-casa
Preferred install command: npx skills add https://github.com/web-casa/pkgseek-skills --skill pkgseek-linux

Please open the skill page and source, review SKILL.md plus every companion file, and explain anything risky before installing.

If shell commands are available, prefer the install command above. If you install manually, copy the complete pkgseek-linux directory that contains SKILL.md, including references, agents, scripts, assets, and any other companion files shown on the skill page. Preserve the relative folder structure. Do not install SKILL.md alone. After installing, verify the target skill folder contains SKILL.md, references/, agents/openai.yaml, and every companion file required by the skill.
```

The prompt asks the Agent to review first, preserve companion files, explain risk, and verify the completed installation.

## Six capabilities, one Skill

| Capability | Reference loaded on demand | Typical Linux questions |
|---|---|---|
| Build and package errors | [`fix-linux-build-error.md`](skills/pkgseek-linux/references/fix-linux-build-error.md) | command not found, missing header, missing `.so`, package not found, linker failure |
| Distribution migration | [`migrate-linux-distribution.md`](skills/pkgseek-linux/references/migrate-linux-distribution.md) | Debian to AlmaLinux, Ubuntu release upgrade, package mapping, EOL planning |
| Vulnerability audit | [`audit-linux-vulnerabilities.md`](skills/pkgseek-linux/references/audit-linux-vulnerabilities.md) | CVE, CNNVD, vendor advisory, backported security fix, false positive |
| ELF and ABI debugging | [`debug-elf-abi.md`](skills/pkgseek-linux/references/debug-elf-abi.md) | GLIBC/GLIBCXX, symbol version, undefined reference, soname, dynamic loader |
| Command portability | [`port-linux-command.md`](skills/pkgseek-linux/references/port-linux-command.md) | GNU vs BSD vs BusyBox, apt/yum/dnf/apk/pacman, shell flags |
| Container review | [`review-linux-container.md`](skills/pkgseek-linux/references/review-linux-container.md) | Dockerfile, base-image lifecycle, repository freshness, reproducible builds |

This structure follows the Agent Skills progressive-disclosure model: clients discover one concise Skill, load its main instructions when relevant, and read a focused reference only when the task requires it.

## Linux package and compatibility coverage

PkgSeek helps Agents investigate Linux packages and file providers across DEB, RPM, APK and other repositories. The workflow covers apt, apt-get, dpkg, yum, dnf, rpm, apk and pacman errors; Debian, Ubuntu, Fedora, RHEL, AlmaLinux, Rocky Linux, Alpine, Arch Linux, openSUSE and other distribution releases; CVE/CNNVD records and Linux vendor backports; ELF shared libraries and ABI compatibility; and container package or lifecycle risk.

The Skill does not treat an upstream version comparison as proof of Linux package vulnerability. It prioritizes distribution vendor advisories, fixed package builds, backport evidence, repository coordinates, and data freshness.

## Connect the read-only PkgSeek MCP

The Skill remains useful without MCP, but current package, distribution, lifecycle, vulnerability, file-provider, and repository facts require the remote endpoint. For Codex, add:

```toml
[mcp_servers.pkgseek]
url = "https://api.pkgseek.com/mcp"
```

The public MCP catalogue is read-only and requires no PkgSeek API key. Client-specific examples for Claude Code, Claude Desktop, Cursor, GitHub Copilot, and OpenCode are at [pkgseek.com/skills/install](https://pkgseek.com/skills/install).

## Install from the GitHub ZIP

Download and inspect the archive, then install the complete Skill directory locally:

```bash
tmp_dir="$(mktemp -d)"
curl --fail --location \
  https://github.com/web-casa/pkgseek-skills/archive/refs/heads/main.zip \
  --output "$tmp_dir/pkgseek-skills.zip"
unzip -q "$tmp_dir/pkgseek-skills.zip" -d "$tmp_dir"
npx --yes skills add "$tmp_dir/pkgseek-skills-main" \
  --skill pkgseek-linux \
  --global \
  --agent codex \
  --yes
```

For Codex without Node.js or `npx`, copy the complete directory without overwriting an existing installation:

```bash
source_dir="$tmp_dir/pkgseek-skills-main/skills/pkgseek-linux"
skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
target="$skill_root/pkgseek-linux"
mkdir -p "$skill_root"

if [ -e "$target" ]; then
  printf 'existing Skill not overwritten: %s\n' "$target"
else
  cp -R "$source_dir" "$target"
fi
```

Restart the Agent after a manual copy so it discovers the new metadata.

## Security model

- Public PkgSeek MCP tools are read-only.
- User-provided commands, build logs, binaries, and Dockerfiles are not executed for inspection.
- Package installation, privilege escalation, repository changes, service changes, and migrations require user confirmation.
- Facts, inference, unknowns, and stale evidence are reported separately.
- ZIP installation downloads and extracts first; this project does not recommend `curl | sh`.

## Repository structure

```text
skills/pkgseek-linux/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── audit-linux-vulnerabilities.md
    ├── debug-elf-abi.md
    ├── fix-linux-build-error.md
    ├── migrate-linux-distribution.md
    ├── port-linux-command.md
    └── review-linux-container.md
```

## Validate

```bash
npm run check
npx skills add . --list
```

## 中文说明

PkgSeek 现在只需要安装一个 `pkgseek-linux` Skill。Linux 构建报错、跨发行版迁移、CVE/CNNVD 与补丁回移判断、ELF/ABI、命令兼容和容器审查六种能力保存在 `references/` 中，由 Agent 根据当前任务按需读取，不需要用户重复安装六次。

推荐安装命令：

```bash
npx skills add https://github.com/web-casa/pkgseek-skills --skill pkgseek-linux
```

安装时必须保留完整的 `pkgseek-linux` 目录，不能只复制 `SKILL.md`。产品说明和在线示例位于 [pkgseek.com/zh-CN/skills](https://pkgseek.com/zh-CN/skills)。PkgSeek 由 [aat.ee](https://aat.ee) 与 [webc.casa](https://webc.casa) 联合出品。

## License

[MIT](LICENSE)
