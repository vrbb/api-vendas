# api-vendas

npm i package.json
### Banco e docker


sudo docker pull dpage/pgadmin4

# Criando ponte entre o container do pgAdmin e do PostgresSQL
sudo docker network create --driver bridge postgres-network

sudo docker run --name pgadmin --network=postgres-network -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=postgres@email.com" -e "PGADMIN_DEFAULT_PASSWORD=postgres" -d dpage/pgadmin4


sudo docker run --name postgres --network=postgres-network  -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

### Criando banco de dados no docker
sudo docker exec api-vendas_db_1 psql -c "CREATE DATABASE apivendas" -U postgres

### Criando as entidades no banco de dados a partir da migation
npm run typeorm migration:run

### Criando banco redis
sudo docker run --name redis -p 6379:6379 -d -t redis:alpine

### Criando o Redis Client
sudo docker run --name some-redis -d redis

### Rodando o Redis Client no docker
sudo docker run -it --network some-network --rm redis redis-cli -h some-redis
