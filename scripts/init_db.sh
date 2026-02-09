#!/usr/bin/env bash
set -euo pipefail

# Simple init script to create the database, tables and seed data.
# Usage: DB_USER=root DB_PASS=pass ./scripts/init_db.sh

DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASS:-}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_NAME="${DB_NAME:-ali_db}"

echo "Initializing database '${DB_NAME}' on ${DB_HOST} as ${DB_USER}"

if [ -z "${DB_PASS}" ]; then
  mysql -h"${DB_HOST}" -u"${DB_USER}" < sql/create_tables.sql
  mysql -h"${DB_HOST}" -u"${DB_USER}" "${DB_NAME}" < sql/seed_data.sql
else
  mysql -h"${DB_HOST}" -u"${DB_USER}" -p"${DB_PASS}" < sql/create_tables.sql
  mysql -h"${DB_HOST}" -u"${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < sql/seed_data.sql
fi

echo "Database initialized."
