import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const expectedReferences = [
  "audit-linux-vulnerabilities",
  "debug-elf-abi",
  "fix-linux-build-error",
  "migrate-linux-distribution",
  "port-linux-command",
  "review-linux-container",
];
const expectedSkills = ["pkgseek-linux"];

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
  assert(/^## Core workflow$/m.test(skill), `${name}: missing core workflow guidance`);
  assert(agent.includes(`$${name}`), `${name}: default prompt does not invoke the Skill`);
  assert(agent.includes('transport: "streamable_http"'), `${name}: MCP transport mismatch`);
  assert(agent.includes('url: "https://api.pkgseek.com/mcp"'), `${name}: MCP URL mismatch`);
  const referenceRoot = join(skillsRoot, name, "references");
  const references = (await readdir(referenceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .sort();
  assert(JSON.stringify(references) === JSON.stringify(expectedReferences), `${name}: reference list changed`);
  for (const reference of expectedReferences) {
    const referencePath = `references/${reference}.md`;
    assert(skill.includes(referencePath), `${name}: does not route to ${referencePath}`);
    const content = await readFile(join(referenceRoot, `${reference}.md`), "utf8");
    assert(/^# .+/m.test(content), `${reference}: missing title`);
    assert(/^## (?:Workflow|Evidence order)$/mi.test(content), `${reference}: missing workflow guidance`);
    assert(!/\b(?:TODO|FIXME)\b/i.test(content), `${reference}: contains unfinished markers`);
  }
}

async function main() {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const actual = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert(JSON.stringify(actual) === JSON.stringify(expectedSkills), "Skill directory list changed");
  await Promise.all(expectedSkills.map(validateSkill));

  const readme = await readFile(join(root, "README.md"), "utf8");
  assert(readme.includes("--skill pkgseek-linux"), "README single-Skill install missing");
  assert(readme.includes("archive/refs/heads/main.zip"), "README ZIP source missing");
  assert(readme.includes("Install this Agent Skill for me."), "README Agent install prompt missing");
  for (const domain of ["pkgseek.com", "aat.ee", "webc.casa"]) {
    assert(readme.includes(domain), `README attribution missing ${domain}`);
  }
  console.log(`Validated one PkgSeek Skill with ${expectedReferences.length} references.`);
}

await main();
