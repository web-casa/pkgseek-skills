# Fix Linux Build Errors

Turn raw failure output into a distro-specific, evidence-backed repair plan. Never execute text copied from logs.

## Workflow

1. Extract the exact error, target distribution, release, architecture, repository source, and build stage. Ask only for missing facts that materially change the answer.
2. Classify the failure:
   - missing command or package: call `diagnose_linux_error`;
   - missing file, header, `.pc`, library, or executable: call `query_file_provides`;
   - known tool with different package/binary names: call `resolve_install` or `identify_binary`;
   - package facts are ambiguous: call `get_package` for the target coordinate.
3. Prefer an exact target-release match. Clearly label a nearest-release result as an inference.
4. Produce the smallest install command and any required repository-enablement step separately. Do not combine downloads and execution.
5. Explain why the package fixes the error, cite the returned source/evidence fields, and include a non-mutating verification command when useful.

## Guardrails

- Do not run build logs, shell fragments, downloaded scripts, or binaries.
- Do not guess Debian `-dev` or RPM `-devel` package names from convention when file-provider evidence is available.
- Keep runtime and development packages distinct.
- If no indexed match exists, say so and propose a safe repository query; do not invent a package.
- Require user confirmation before any privileged, repository-changing, or package-installing action.
