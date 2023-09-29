if [ $# -eq 0 ];  then
    echo "Missing service name"
    exit 1
fi

if [ $1 == "api" ]; then
  docker pull isaacbatst/turma-fit-api:production
  docker compose --file compose.production.yml up api -d --build
  exit 0
fi

if [ $1 == "dashboard" ]; then
  docker pull isaacbatst/turma-fit-dashboard:production
  docker compose --file compose.production.yml up dashboard -d --build
  exit 0
fi
