---
name: debug-elf-abi
description: Diagnose Linux ELF, shared-library, loader, symbol-version, undefined-reference, and ABI compatibility failures. Use for missing .so files, GLIBC or GLIBCXX requirements, dynamic loader errors, cross-distro binaries, and native build troubleshooting.
---

# Debug ELF and ABI

Identify the missing artifact and separate link-time, load-time, and symbol-version failures.

## Workflow

1. Record the exact error, distro/release, architecture, binary provenance, and whether it occurs while linking or running.
2. If a local binary is available, inspect it without executing it using `file`, `readelf -h -d -s -V`, and `objdump -T` as available. Do not use `ldd` on untrusted binaries because some environments may execute loader behavior.
3. For a missing path or soname, call `query_file_provides`; use `get_package` to confirm target-release availability.
4. For version compatibility, call `compare_package_versions` and `get_package_history`. Distinguish library package version from exported symbol version.
5. Explain the required loader, soname, symbol and version node separately. Recommend rebuilding on an older compatible baseline, using a supported container, or installing a matching vendor package.

## Guardrails

- Do not recommend replacing system `libc`, the dynamic loader, or core libraries by copying random `.so` files.
- Do not use `LD_LIBRARY_PATH` as a universal fix; explain its process-wide risk.
- Check architecture and libc family before comparing versions.
- Treat symbol ownership and first-version claims as evidence-dependent; say when PkgSeek lacks an indexed symbol fact.

Use `https://api.pkgseek.com` as a REST fallback only when PkgSeek MCP is unavailable.
