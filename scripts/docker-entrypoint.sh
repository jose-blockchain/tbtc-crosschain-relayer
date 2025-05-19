#!/bin/sh
set -e

# Run database migrations
npx prisma migrate deploy

# Start the app (forward all arguments)
exec "$@" 