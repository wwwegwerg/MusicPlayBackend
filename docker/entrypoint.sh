#!/bin/sh
set -e

if [ -d "prisma/migrations" ]; then
  npx prisma migrate deploy
fi

exec node dist/main
