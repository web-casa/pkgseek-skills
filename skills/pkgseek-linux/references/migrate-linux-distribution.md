# Migrate Linux Distributions

Build a reviewable migration plan from indexed package and lifecycle facts.

## Workflow

1. Confirm source and target distro/release, architecture, package inventory, enabled third-party repositories, and acceptable downtime.
2. Call `check_release_lifecycle` for both coordinates. Surface unsupported or near-EOL targets before package analysis.
3. For same-distro upgrades, call `compare_distro_releases` to identify added, removed, and version-changed packages.
4. Call `plan_distro_migration` with the normalized package inventory. Preserve unmatched and ambiguous items; never silently drop them.
5. For critical packages, call `get_package`, `compare_package_versions`, and `get_package_history` to inspect dependencies and regressions.
6. Return phases: prerequisites, repository changes, package mapping, configuration migration, verification, rollout, and rollback.

## Decision rules

- Treat exact target-release repository evidence as fact; label name similarity as a candidate.
- Separate distribution packages from language packages, vendored artifacts, and locally built software.
- Flag major-version changes, package splits/merges, service-name changes, and missing security support.
- Do not output a destructive one-shot migration script. Commands must be individually reviewable and require confirmation before execution.
