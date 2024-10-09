#!/bin/bash

# Reads _FILE environment variables and adds the content to an environment variable with the same name, but without the _FILE suffix.
# Taken from MySQL's docker entrypoint.

set -e

file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "Error: Both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

file_env "DB_SQL_PASSWORD"
file_env "DB_SQL_USER"
file_env "COMA_REALTIME_KEY"