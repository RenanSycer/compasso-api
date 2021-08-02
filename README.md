<p align="center">
  <br>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://logodownload.org/wp-content/uploads/2018/09/uol-logo-4-1.png" width="120" marin_left="10px" alt="Uol logo" /></a>
 
</p>


## Compasso API


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  
## Descrição do repositório

Compasso Api é um projeto criado com intuito para avilação de conhecimento da Compasso Uol.

A API foi desenvolvida em Node JS , Framework Nest JS, banco de dados PostgresSQL, Swagger para promover a documentação.

Artefatos providos no repositório: Código da fonte, arquivo docker-compose para instalação do banco de dados, .env.example com variaveis de ambientes de exmplo para configuração da API.

## Installation

**Dependências: NodeJS v14.17.4, NPM ou Yarn.**

-Clone o respositório


```bash
$ git clone https://github.com/RenanSycer/compasso-api.git
$ cd compasso-api
```

**Instale as dependencias do projeto**


```bash
$ npm install
```
Ou usando Yarn

```bash
$ yarn install
```

**Configurando .env.example**

```
.env.example
```

- Na raiz do projeto, há um arquivo de exemplo, basta remover o sufixo .example e manter o .env

```
.env
```
- As configuração já pré-inseridas no example são o suficiente para prover as variáveis para o docker-compose e para o arquivo de configurações do Nest
- Configure da forma que desejar ou mantenha-o. (não esquecer de remover o sufixo .example)


**Docker Compose**

```bash
$ sudo docker-compose up -d
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Ou usando Yarn

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Testing

```bash
# unit tests
$ npm run test

# unit test on watch mode
$ npm run test:watch
```
Ou usando Yarn


```bash
# unit tests
$ yarn run test

# unit test on watch mode
$ yarn run test:watch
```

## Swagger

- Para acessar a documentação do swagger, basta acessar:

```
http://localhost:3000/api
```

