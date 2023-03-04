
#!/bin/bash
. ./.env
PGPASSWORD=${PG_PASSWORD} docker compose exec -it database psql -h ${PG_HOST} -U ${PG_USER} -d ${PG_DB_NAME}