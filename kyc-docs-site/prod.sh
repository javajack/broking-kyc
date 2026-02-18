#!/usr/bin/env bash
# KYC Docs Site — Production Preview (serves built output)
# Usage: ./prod.sh [port]

PORT="${1:-4322}"

cd "$(dirname "$0")" || exit 1

echo "Building site..."
npm run build 2>&1 | tail -5

echo ""
echo "Starting preview server on http://localhost:$PORT/broking-kyc"
nohup npx astro preview --port "$PORT" > /tmp/kyc-docs-prod.log 2>&1 &
echo $! > /tmp/kyc-docs-prod.pid

echo "PID: $(cat /tmp/kyc-docs-prod.pid)"
echo "Log: /tmp/kyc-docs-prod.log"
echo ""
echo "To stop: kill \$(cat /tmp/kyc-docs-prod.pid)"

sleep 2
if kill -0 "$(cat /tmp/kyc-docs-prod.pid)" 2>/dev/null; then
    echo "Server is running."
else
    echo "Server failed to start. Check /tmp/kyc-docs-prod.log"
    cat /tmp/kyc-docs-prod.log
fi
