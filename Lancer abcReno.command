#!/bin/zsh
set -e

APP_DIR="${0:A:h}"
PORT=8765

cd "$APP_DIR"

if ! curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
  /usr/bin/python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$APP_DIR" >/tmp/abcreno-contrats.log 2>&1 &
fi

sleep 1
open "http://127.0.0.1:$PORT/"
