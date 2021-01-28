  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## GraphQL Playground

```
http://localhost:3000/graphql
```

## PostgreSQL Database

```
Host:     pgsql-server
Database: postgres
Username: postgres
Password: postgres
```

## PgAdmin login to access data in local environment

```
Browser: http://localhost:5050
Username: pgadmin4@pgadmin.org
Password: pgadmin
```

## Set up Prisma

### Install Prisma

```
npx prisma
```

### Initialize Prisma

```
npx prisma init
```

### Generate Prisma Client

```
npx prisma generate

Prisma models can be found in node_modules/.prisma/client/schema.prisma
```

### Create Prisma migration script

```
npx prisma migrate dev --create-only --preview-feature

New script is generated in prisma/migrations folder
```

### Apply Prisma migration script

```
npx prisma migrate deploy --preview-feature
```

### Populate seed data in the database

Install typescript and ts-node

```
npm i --save-dev typescript ts-node
```

Run typescript script to populate data

```
ts-node scripts/seed.ts
```

## GraphQL API

### Add Language

```

```

## NestJS GrapQL Example repo

```
https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first
```

## Prisma CLI command

https://www.prisma.io/docs/reference/api-reference/command-reference

## Prisma Quick Start TypeScript

https://www.prisma.io/docs/getting-started/quickstart-typescript

## License

Nest is [MIT licensed](LICENSE).
