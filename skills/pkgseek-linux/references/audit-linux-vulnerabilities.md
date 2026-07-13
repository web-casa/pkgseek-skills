# Audit Linux Vulnerabilities

Assess distribution packages without assuming that an upstream version string fully determines vulnerability status.

## Evidence order

Use the strongest available evidence in this order:

1. distribution security advisory or vendor package status;
2. distribution update metadata and fixed package build;
3. explicit backport or patch evidence;
4. upstream affected/fixed ranges;
5. version-only inference, clearly labeled as uncertain.

## Workflow

1. Normalize package name, distro, release, repository, architecture, and installed version.
2. Call `search_vulnerabilities` with `database: cve`; use `database: cnnvd` when Chinese vulnerability context is requested.
3. Call `get_vulnerability` for each candidate and inspect distro-aware evidence.
4. Call `get_package` to distinguish the installed distribution build from the upstream version.
5. Classify each item as affected, fixed, not affected, under investigation, or insufficient evidence. Include the evidence tier and reason.
6. Recommend the vendor-supported fixed build or supported-release migration. Avoid unverified upstream binary replacement.

## Guardrails

- Never mark a backported package vulnerable solely because its upstream base version is old.
- Never mark it safe solely because a version string appears newer.
- Distinguish record publication date, vendor advisory date, package build date, and local observation date.
- State data freshness and gaps. Do not turn CNNVD severity into a distribution package status without supporting mapping.
