#!/bin/bash
# Build kyc.html from Markdown sections + Pandoc template
# Usage: cd kyc-docs && ./build.sh

set -e
cd "$(dirname "$0")"

# Find pandoc — check ~/.local/bin first, then PATH
PANDOC="${HOME}/.local/bin/pandoc"
if [ ! -x "$PANDOC" ]; then
  PANDOC="$(command -v pandoc 2>/dev/null || true)"
fi
if [ -z "$PANDOC" ]; then
  echo "ERROR: pandoc not found. Install via: sudo apt install pandoc"
  exit 1
fi

echo "Using: $PANDOC ($($PANDOC --version | head -1))"

cat sections/*.md | "$PANDOC" \
  --from=markdown+fenced_divs+raw_html+pipe_tables+backtick_code_blocks \
  --to=html5 \
  --template=template.html \
  --metadata-file=metadata.yaml \
  --lua-filter=strip-heading-ids.lua \
  --wrap=none \
  --no-highlight \
  -o ../kyc.html

LINES=$(wc -l < ../kyc.html)
echo "Built kyc.html ($LINES lines)"
