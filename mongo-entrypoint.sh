#!/bin/bash
set -e

mongo -u "${MONGO_INITDB_ROOT_USERNAME}" -p "${MONGO_INITDB_ROOT_PASSWORD}" <<EOF
use ${MONGO_INITDB_DATABASE}
db.createUser({
  user:  '${MONGO_USER}',
  pwd: '${MONGO_PASSWORD}',
  roles: [{
    role: 'readWrite',
    db: '${MONGO_INITDB_DATABASE}'
  }]
})
EOF

echo "MongoDB user created"
