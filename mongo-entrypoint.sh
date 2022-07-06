#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u "${MONGO_INITDB_ROOT_USERNAME}" -p "${MONGO_INITDB_ROOT_PASSWORD}" --eval "db.createUser({user: '${MONGO_USER}', pwd: '${MONGO_PASSWORD}', roles: [{role: 'readWrite', db: '${MONGO_INITDB_DATABASE}'}]});"
echo "Mongo users created."
