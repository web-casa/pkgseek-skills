# PkgSeek Agent Skills

[![Validate Skills](https://github.com/web-casa/pkgseek-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/web-casa/pkgseek-skills/actions/workflows/validate.yml)

Six open Agent Skills for Linux package troubleshooting, distribution migration,
vulnerability triage, ELF/ABI debugging, command portability, and container review.
They use the read-only PkgSeek MCP fact layer at `https://api.pkgseek.com/mcp`.

中文说明见[下方](#中文说明)。Product documentation and interactive examples are
available at [pkgseek.com/skills](https://pkgseek.com/skills).

## Install with `npx skills`

List the Skills before installing anything:

```bash
npx skills add web-casa/pkgseek-skills --list
```

Open the interactive installer:

```bash
npx skills add web-casa/pkgseek-skills
```

Install every Skill globally for Codex without prompts:

```bash
npx skills add web-casa/pkgseek-skills --skill '*' --global --agent codex --yes
```

Install one Skill globally for Claude Code:

```bash
npx skills add web-casa/pkgseek-skills \
  --skill debug-elf-abi \
  --global \
  --agent claude-code \
  --yes
```

Install all Skills for multiple agents:

```bash
npx skills add web-casa/pkgseek-skills \
  --skill '*' \
  --global \
  --agent codex \
  --agent claude-code \
  --agent cursor \
  --yes
```

The default scope is the current project. Keep `--global` only when the Skills
should be available to every project for that user.

## Install from the GitHub ZIP

Download the ZIP, inspect it, then install from the extracted local directory:

```bash
tmp_dir="$(mktemp -d)"
curl --fail --location \
  https://github.com/web-casa/pkgseek-skills/archive/refs/heads/main.zip \
  --output "$tmp_dir/pkgseek-skills.zip"
unzip -q "$tmp_dir/pkgseek-skills.zip" -d "$tmp_dir"
npx skills add "$tmp_dir/pkgseek-skills-main" \
  --skill '*' \
  --global \
  --agent codex \
  --yes
```

For Codex without Node.js or `npx`, use this self-contained download and copy
flow. It does not overwrite an existing same-name Skill directory:

```bash
tmp_dir="$(mktemp -d)"
curl --fail --location \
  https://github.com/web-casa/pkgseek-skills/archive/refs/heads/main.zip \
  --output "$tmp_dir/pkgseek-skills.zip"
unzip -q "$tmp_dir/pkgseek-skills.zip" -d "$tmp_dir"

skill_root="${CODEX_HOME:-$HOME/.codex}/skills"
mkdir -p "$skill_root"

for source in "$tmp_dir/pkgseek-skills-main"/skills/*; do
  target="$skill_root/$(basename "$source")"
  if [ -e "$target" ]; then
    printf 'skip existing skill: %s\n' "$target"
  else
    cp -R "$source" "$target"
  fi
done
```

Restart the agent after a manual copy so it discovers the new Skill metadata.

## Connect the PkgSeek MCP fact layer

The Skills still provide useful investigation discipline without MCP, but live
package, distribution, lifecycle, and vulnerability facts require the remote
PkgSeek MCP endpoint. For Codex, add this to `~/.codex/config.toml`:

```toml
[mcp_servers.pkgseek]
url = "https://api.pkgseek.com/mcp"
```

The public MCP catalogue is read-only and does not require a PkgSeek API key.
See the [PkgSeek installation center](https://pkgseek.com/skills/install) for
Claude Code, Claude Desktop, Cursor, GitHub Copilot, and OpenCode examples.

## Skills

| Skill | Use it for |
|---|---|
| [`fix-linux-build-error`](skills/fix-linux-build-error/SKILL.md) | Missing commands, headers, libraries, packages, and build dependencies |
| [`migrate-linux-distribution`](skills/migrate-linux-distribution/SKILL.md) | Package-aware distribution and release migration planning |
| [`audit-linux-vulnerabilities`](skills/audit-linux-vulnerabilities/SKILL.md) | CVE/CNNVD triage with vendor and backport evidence |
| [`debug-elf-abi`](skills/debug-elf-abi/SKILL.md) | ELF, shared-library, loader, symbol-version, and ABI failures |
| [`port-linux-command`](skills/port-linux-command/SKILL.md) | GNU, BSD, BusyBox, macOS, and minimal-container command portability |
| [`review-linux-container`](skills/review-linux-container/SKILL.md) | Dockerfile lifecycle, package, repository, and reproducibility review |

Every Skill keeps user-provided commands and binaries non-executing by default,
separates facts from inference, and requires confirmation before privileged or
state-changing system operations.

## Validate

```bash
npm run check
npx skills add . --list
```

## 中文说明

这个仓库独立发布 PkgSeek 的六个 Linux Agent Skills。Skill 负责调查步骤、
证据优先级和安全边界；`https://api.pkgseek.com/mcp` 提供只读的软件包、发行版、
生命周期和漏洞事实。

推荐先查看清单，再交互式安装：

```bash
npx skills add web-casa/pkgseek-skills --list
npx skills add web-casa/pkgseek-skills
```

为 Codex 全局安装全部 Skills：

```bash
npx skills add web-casa/pkgseek-skills --skill '*' --global --agent codex --yes
```

ZIP 安装请使用上面的“Install from the GitHub ZIP”步骤：先下载和检查压缩包，
再从解压后的本地目录安装，不使用 `curl | sh`。

## License

[MIT](LICENSE)
