#!/usr/bin/env bash
#
# KYC Docs — Build, Commit & Deploy
#
# Usage:
#   ./build.sh              # build + commit + deploy (default)
#   ./build.sh build        # build only (output in kyc-docs-site/dist/)
#   ./build.sh commit       # git add + commit changes on main
#   ./build.sh deploy       # push existing dist/ to gh-pages
#   ./build.sh dev          # start local dev server
#   ./build.sh preview      # build + serve locally (no deploy)
#
# Deploys locally via gh-pages branch — no GitHub Actions needed.
# Repo setting: Pages → Source → "Deploy from a branch" → gh-pages / root
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$REPO_ROOT/kyc-docs-site"
DIST_DIR="$SITE_DIR/dist"
BRANCH="gh-pages"
SITE_URL="https://javajack.github.io/broking-kyc/"

# Colors (disabled if not a terminal)
if [ -t 1 ]; then
  GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'
else
  GREEN=''; YELLOW=''; RED=''; CYAN=''; BOLD=''; RESET=''
fi

info()  { echo -e "${CYAN}==> ${RESET}$*"; }
ok()    { echo -e "${GREEN}==> ${RESET}$*"; }
warn()  { echo -e "${YELLOW}==> ${RESET}$*"; }
fail()  { echo -e "${RED}==> ERROR: ${RESET}$*" >&2; exit 1; }

# ── Dependencies ──
install_deps() {
  cd "$SITE_DIR"
  if [ ! -d node_modules ] || [ package.json -nt node_modules/.package-lock.json 2>/dev/null ]; then
    info "Installing dependencies..."
    npm ci --silent
  fi
}

# ── Build ──
do_build() {
  install_deps
  cd "$SITE_DIR"

  info "Building production site..."
  npm run build

  PAGE_COUNT=$(find "$DIST_DIR" -name '*.html' | wc -l)
  DIST_SIZE=$(du -sh "$DIST_DIR" | cut -f1)
  echo ""
  ok "Build complete: ${BOLD}$PAGE_COUNT pages${RESET}, ${BOLD}$DIST_SIZE${RESET}"
  echo "    Output: $DIST_DIR"
}

# ── Commit ──
do_commit() {
  cd "$REPO_ROOT"

  # Check for changes
  if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    warn "No changes to commit."
    return 0
  fi

  info "Staging changes..."
  git add -A

  # Build a useful commit message from changed files
  CHANGED=$(git diff --cached --stat | tail -1)
  MSG="Update KYC docs — $CHANGED"

  info "Committing: $MSG"
  git commit -m "$MSG"

  ok "Committed on $(git branch --show-current)."
}

# ── Deploy to gh-pages ──
do_deploy() {
  [ -d "$DIST_DIR" ] || fail "dist/ not found. Run './build.sh build' first."

  cd "$REPO_ROOT"
  REMOTE_URL=$(git remote get-url origin)
  COMMIT_HASH=$(git log -1 --format='%h %s' 2>/dev/null || echo 'local build')
  COMMIT_MSG="Deploy KYC docs — $(date '+%Y-%m-%d %H:%M') — $COMMIT_HASH"

  info "Deploying dist/ → $BRANCH branch..."

  # Fresh gh-pages branch from dist/ contents
  TMPDIR=$(mktemp -d)
  trap 'rm -rf "$TMPDIR"' EXIT
  cp -r "$DIST_DIR"/. "$TMPDIR"/

  # .nojekyll ensures _astro/ directory is served correctly
  touch "$TMPDIR/.nojekyll"

  cd "$TMPDIR"
  git init -q
  git checkout -q -b "$BRANCH"
  git add -A
  git commit -q -m "$COMMIT_MSG"
  git remote add origin "$REMOTE_URL"

  info "Pushing to $BRANCH..."
  git push -f origin "$BRANCH"

  cd "$REPO_ROOT"

  echo ""
  ok "Deployed! Site will be live in ~60s at:"
  echo -e "    ${BOLD}$SITE_URL${RESET}"
}

# ── Dev server ──
do_dev() {
  install_deps
  cd "$SITE_DIR"
  info "Starting dev server..."
  npx astro dev --host
}

# ── Preview (build + local serve) ──
do_preview() {
  do_build
  cd "$SITE_DIR"
  echo ""
  info "Starting preview server..."
  npx astro preview --host
}

# ── Main ──
case "${1:-all}" in
  build)   do_build ;;
  commit)  do_commit ;;
  deploy)  do_deploy ;;
  dev)     do_dev ;;
  preview) do_preview ;;
  all)     do_build && do_commit && do_deploy ;;
  *)
    echo "Usage: $0 [build|commit|deploy|dev|preview|all]"
    echo ""
    echo "  build    Build production site (output in kyc-docs-site/dist/)"
    echo "  commit   Stage and commit all changes on current branch"
    echo "  deploy   Push existing dist/ to gh-pages branch"
    echo "  dev      Start local dev server with hot reload"
    echo "  preview  Build + serve locally (no deploy)"
    echo "  all      Build + commit + deploy (default)"
    exit 1
    ;;
esac
