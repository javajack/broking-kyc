#!/usr/bin/env bash
# KYC Docs Site — Development Server
# Usage: ./dev.sh [port]

PORT="${1:-4321}"

cd "$(dirname "$0")" || exit 1

echo "Starting dev server on http://localhost:$PORT/broking-kyc"
nohup npx astro dev --port "$PORT" > /tmp/kyc-docs-dev.log 2>&1 &
echo $! > /tmp/kyc-docs-dev.pid

echo "PID: $(cat /tmp/kyc-docs-dev.pid)"
echo "Log: /tmp/kyc-docs-dev.log"
echo ""
echo "To stop: kill \$(cat /tmp/kyc-docs-dev.pid)"

# Wait a moment then confirm it started
sleep 2
if kill -0 "$(cat /tmp/kyc-docs-dev.pid)" 2>/dev/null; then
    echo "Server is running."
else
    echo "Server failed to start. Check /tmp/kyc-docs-dev.log"
    cat /tmp/kyc-docs-dev.log
fi
