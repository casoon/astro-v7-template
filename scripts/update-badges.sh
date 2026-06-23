#!/usr/bin/env bash
set -euo pipefail

# Reads versions from pnpm-workspace.yaml catalog and updates README badges.
# Run manually or via CI after dependency updates.

WORKSPACE="pnpm-workspace.yaml"
README="README.md"

get_version() {
  grep "^  $1:" "$WORKSPACE" | sed 's/.*\^//' | tr -d ' '
}

ASTRO=$(get_version "astro")
TAILWIND=$(get_version "tailwindcss")
SVELTE=$(get_version "svelte")
TYPESCRIPT=$(get_version "typescript")
BIOME=$(get_version '"@biomejs/biome"')
ZOD=$(get_version "zod")

# pnpm version from package.json packageManager field
PNPM=$(grep '"packageManager"' package.json | sed 's/.*pnpm@//' | tr -d '",')

# nosecrets version from root package.json
NOSECRETS=$(grep '"@casoon/nosecrets"' package.json | sed 's/.*\^//' | tr -d '", ')

# Escape hyphens for shields.io (- is a separator, use -- for literal hyphen)
escape_shields() { echo "$1" | sed 's/-/--/g'; }

ASTRO_ESC=$(escape_shields "$ASTRO")
TAILWIND_ESC=$(escape_shields "$TAILWIND")
SVELTE_ESC=$(escape_shields "$SVELTE")
TYPESCRIPT_ESC=$(escape_shields "$TYPESCRIPT")
BIOME_ESC=$(escape_shields "$BIOME")
ZOD_ESC=$(escape_shields "$ZOD")
NOSECRETS_ESC=$(escape_shields "$NOSECRETS")
PNPM_ESC=$(escape_shields "$PNPM")

# Build badges file
BADGES_FILE=$(mktemp)
cat > "$BADGES_FILE" <<EOF
[![CI](https://github.com/casoon/astro-v6-template/actions/workflows/ci.yml/badge.svg)](https://github.com/casoon/astro-v6-template/actions/workflows/ci.yml)
[![Astro](https://img.shields.io/badge/Astro-${ASTRO_ESC}-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-${TAILWIND_ESC}-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Svelte](https://img.shields.io/badge/Svelte-${SVELTE_ESC}-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-${TYPESCRIPT_ESC}-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/Biome-${BIOME_ESC}-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)
[![Zod](https://img.shields.io/badge/Zod-${ZOD_ESC}-3068B7?logo=zod&logoColor=white)](https://zod.dev)
[![pnpm](https://img.shields.io/badge/pnpm-${PNPM_ESC}-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![nosecrets](https://img.shields.io/badge/nosecrets-${NOSECRETS_ESC}-4B32C3?logo=gnuprivacyguard&logoColor=white)](https://www.npmjs.com/package/@casoon/nosecrets)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
EOF

# Replace badge block between markers
awk -v file="$BADGES_FILE" '
  /<!-- BADGES:START -->/ { print; while ((getline line < file) > 0) print line; skip=1; next }
  /<!-- BADGES:END -->/   { skip=0 }
  !skip { print }
' "$README" > "${README}.tmp" && mv "${README}.tmp" "$README"

rm -f "$BADGES_FILE"

echo "Badges updated: Astro=$ASTRO Tailwind=$TAILWIND Svelte=$SVELTE TS=$TYPESCRIPT Biome=$BIOME Zod=$ZOD nosecrets=$NOSECRETS pnpm=$PNPM"
