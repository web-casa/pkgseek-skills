# Review Linux Containers

Review container package decisions without building or running untrusted images.

## Workflow

1. Read the Dockerfile and lockfiles. Inventory every base image, stage, package-manager command, external repository, downloaded artifact, and architecture assumption.
2. Call `check_release_lifecycle` for each resolvable base distribution release.
3. Use `resolve_install` and `get_package` to confirm packages in the intended release. Use `get_repository_health` to report index freshness.
4. Call `get_package_history` for suspicious unpinned or recently changed critical packages.
5. If migration is needed, use `compare_distro_releases` or `plan_distro_migration` before proposing a new base.
6. Report findings by severity with file/line, evidence, impact, minimal fix, and verification step.

## Review rules

- Flag EOL bases, floating release tags, unverified remote scripts, disabled signature checks, cache retention, secret leakage, and runtime build toolchains.
- Do not claim a container is vulnerability-free from package version strings alone.
- Prefer vendor-supported repositories and digest pinning where operationally appropriate.
- Do not run `docker build`, execute image entrypoints, or fetch remote scripts unless the user explicitly authorizes it.
