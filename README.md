# api-vendas

npm i package.json
### Banco e docker


docker pull dpage/pgadmin4

# Criando ponte entre o container do pgAdmin e do PostgresSQL
docker network create --driver bridge postgres-network

docker run --name pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=postgres@email.com" -e "PGADMIN_DEFAULT_PASSWORD=postgres" -d dpage/pgadmin4


docker run --name postgres --network=postgres-network  -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

### Criando banco de dados no docker
docker exec postgres psql -c "CREATE DATABASE apivendas" -U postgres

### Criando as entidades no banco de dados a partir da migation
npm run typeorm migration:run
