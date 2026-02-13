#!/usr/bin/env bash
#
# Local build & deploy to GitHub Pages (gh-pages branch)
#
# Usage:
#   ./deploy.sh          # build + deploy
#   ./deploy.sh build    # build only (output in dist/)
#   ./deploy.sh deploy   # deploy existing dist/ to gh-pages branch
#
# No GitHub Actions minutes consumed — purely local.
# Repo setting: Pages → Source → "Deploy from a branch" → gh-pages / root
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$SCRIPT_DIR/dist"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BRANCH="gh-pages"

cd "$SCRIPT_DIR"

build() {
  echo "==> Installing dependencies..."
  npm ci --silent

  echo "==> Building production site..."
  npm run build

  PAGE_COUNT=$(find "$DIST_DIR" -name '*.html' | wc -l)
  DIST_SIZE=$(du -sh "$DIST_DIR" | cut -f1)
  echo ""
  echo "==> Build complete: $PAGE_COUNT pages, $DIST_SIZE"
  echo "    Output: $DIST_DIR"
}

deploy() {
  if [ ! -d "$DIST_DIR" ]; then
    echo "ERROR: dist/ not found. Run './deploy.sh build' first."
    exit 1
  fi

  echo "==> Deploying dist/ to $BRANCH branch..."

  cd "$REPO_ROOT"
  REMOTE_URL=$(git remote get-url origin)
  COMMIT_MSG="Deploy KYC docs — $(date '+%Y-%m-%d %H:%M') — $(cd "$SCRIPT_DIR" && git log -1 --format='%h %s' 2>/dev/null || echo 'local build')"

  # Create a fresh gh-pages branch from dist/ contents
  TMPDIR=$(mktemp -d)
  cp -r "$DIST_DIR"/. "$TMPDIR"/

  cd "$TMPDIR"
  git init -q
  git checkout -q -b "$BRANCH"
  git add -A
  git commit -q -m "$COMMIT_MSG"
  git remote add origin "$REMOTE_URL"

  echo "==> Pushing to $BRANCH..."
  git push -f origin "$BRANCH"

  cd "$REPO_ROOT"
  rm -rf "$TMPDIR"

  echo ""
  echo "==> Deployed! Site will be live at:"
  echo "    https://javajack.github.io/broking-kyc/"
  echo ""
  echo "    Repo setting needed (one-time):"
  echo "    Settings → Pages → Source → 'Deploy from a branch' → gh-pages / root"
}

case "${1:-all}" in
  build)  build ;;
  deploy) deploy ;;
  all)    build && deploy ;;
  *)
    echo "Usage: $0 [build|deploy|all]"
    echo "  build  — production build only (output in dist/)"
    echo "  deploy — push existing dist/ to gh-pages branch"
    echo "  all    — build + deploy (default)"
    exit 1
    ;;
esac
