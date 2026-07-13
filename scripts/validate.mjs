import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const expectedSkills = [
  "audit-linux-vulnerabilities",
  "debug-elf-abi",
  "fix-linux-build-error",
  "migrate-linux-distribution",
  "port-linux-command",
  "review-linux-container",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function validateSkill(name) {
  const skillPath = join(skillsRoot, name, "SKILL.md");
  const agentPath = join(skillsRoot, name, "agents", "openai.yaml");
  const [skill, agent] = await Promise.all([
    readFile(skillPath, "utf8"),
    readFile(agentPath, "utf8"),
  ]);
  const frontmatter = skill.match(/^---\n([\s\S]+?)\n---\n/);
  assert(frontmatter, `${name}: missing YAML frontmatter`);
  assert(frontmatter[1].includes(`name: ${name}`), `${name}: frontmatter name mismatch`);
  assert(/^description: .+/m.test(frontmatter[1]), `${name}: missing description`);
  assert(!/\b(?:TODO|FIXME)\b/i.test(skill), `${name}: contains unfinished markers`);
  assert(/^## (?:Workflow|Evidence Order)$/m.test(skill), `${name}: missing workflow guidance`);
  assert(agent.includes(`$${name}`), `${name}: default prompt does not invoke the Skill`);
  assert(agent.includes('transport: "streamable_http"'), `${name}: MCP transport mismatch`);
  assert(agent.includes('url: "https://api.pkgseek.com/mcp"'), `${name}: MCP URL mismatch`);
}

async function main() {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const actual = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert(JSON.stringify(actual) === JSON.stringify(expectedSkills), "Skill directory list changed");
  await Promise.all(expectedSkills.map(validateSkill));

  const readme = await readFile(join(root, "README.md"), "utf8");
  assert(readme.includes("npx skills add web-casa/pkgseek-skills"), "README npx source mismatch");
  assert(readme.includes("archive/refs/heads/main.zip"), "README ZIP source missing");
  console.log(`Validated ${expectedSkills.length} PkgSeek Skills.`);
}

await main();
