#!/usr/bin/env bash
# KYC Docs Site — Stop running servers
# Usage: ./stop.sh [dev|prod|all]

MODE="${1:-all}"

stop_server() {
    local name="$1"
    local pidfile="$2"
    if [ -f "$pidfile" ]; then
        pid=$(cat "$pidfile")
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
            echo "Stopped $name server (PID $pid)"
        else
            echo "$name server not running (stale PID $pid)"
        fi
        rm -f "$pidfile"
    else
        echo "No $name server PID file found"
    fi
}

case "$MODE" in
    dev)  stop_server "dev" /tmp/kyc-docs-dev.pid ;;
    prod) stop_server "prod" /tmp/kyc-docs-prod.pid ;;
    all)
        stop_server "dev" /tmp/kyc-docs-dev.pid
        stop_server "prod" /tmp/kyc-docs-prod.pid
        ;;
    *)    echo "Usage: ./stop.sh [dev|prod|all]" ;;
esac
