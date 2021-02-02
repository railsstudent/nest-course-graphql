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

### Language API

```
Get Language
query Languages {
  getLanguages {
    id
    name
    nativeName
  }
}

Add Language
mutation NewFrenchLanguage {
  addLanguage(newLanguage:{ name: "French", nativeName:"Français"}) {
    id
    name
    nativeName
  }
}

Update Language
mutation UpdateLanguage {
	updateLanguage(updateLanguage:{
    id:"7424c53b-1b44-4065-ad1f-f179b64c8aae",
    name:"Italian", nativeName:"Italiano"}) {
    id
    name
    nativeName
  }
}
```

### Course API

```
Get Courses
query AllCourses {
  courses {
    id
    name
    description
    lessons(args: { offset: 0, limt: 3 }) {
      id
      name
    }
  }
}

Get Courses with variable
query AllCourses2 ($args: PaginationArgs!) {
  courses {
    id
    name
    description
    language {
      id
      name
      nativeName
    }
    lessons(args: $args) {
      id
      name
    }
  }
}

Paramter
{
  "args": {
    "offset": 0,
    "limit": 1
  }
}

Get Course
query Course {
  course(id:"c4b7db78-ccc3-4882-b767-e2c98feaa08f") {
    id
    name
    description
    language {
      id
      name
      nativeName
    }
    lessons (args: { offset: 0, limt: 3 } ) {
      id
      name
    }
  }
}

Add Course
mutation addCourse {
  addCourse(newCourse:{
    name: "Spanish 103",
    languageId: "69883305-b9fa-44ef-a118-5eb6087ab815",
    description: "Spanish course beginner level 3" }) {
   	id
  	name
  }
}

Update Course
mutation updateCourse {
  updateCourse(course:{ id: "c4b7db78-ccc3-4882-b767-e2c98feaa08f",
    name:"Spanish 201"
    description:"Spanish course intermediate level"
    languageId: "69883305-b9fa-44ef-a118-5eb6087ab815"}) {
    id
    name
    description
    language {
      id
      name
      nativeName
    }
  }
}
```

### Lesson API

```
Get Lesson
query SpanishGreetingLesson {
  lesson(id: "6cadde28-ac00-4a7c-a7f3-afd1bea5ca25") {
    id
    name
    course {
      id
      name
      description
    }
    sentences {
      id
      text
      translations {
        id
        text
      }
    }
  }
}

Add Lesson
mutation addSpanishLesson {
  addLesson(
    newLesson: {
      name: "Months"
      courseId: "f4018104-08d3-45cc-8bfc-1c2b1a0f8c41"
    }
  ) {
    id
    name
  }
}

Update Lesson
mutation updateLesson {
  updateLesson(
    lesson: { name: "Nature", id: "e6648184-49ee-42d7-95bb-6a27db816dab" }
  ) {
    id
    name
  }
}
```

### Sentence API

```
Get Sentence
query getSentence {
  getSentence(id:"5572195e-93ec-4d65-a141-3d35e6dd9705") {
    id
    text
    lesson {
      id
      name
    }
  }
}

Add Sentence
mutation addSentence {
  addSentence(newSentence:{
    text:"Ellas son niñas",
    lessonId:"73f47aa8-0e2a-49dd-a21b-23b0eca4ccbd"}) {
    id
    text
    lesson {
      id
      name
    }
  }
}

Update Sentence
mutation updateSentence {
  updateSentence(updateSentence:{
    id: "38b9a04e-bf9d-4864-8bcb-8ee2323a49bd",
    text:"Ellos son hombres",
    lessonId:"73f47aa8-0e2a-49dd-a21b-23b0eca4ccbd"}) {
    id
    text
    lesson {
      id
      name
    }
  }
}

Add new translation to a sentence
mutation NewTranslation {
  addTranslation (newTranslation:{
    languageId:"7424c53b-1b44-4065-ad1f-f179b64c8aae",
    sentenceId:"38b9a04e-bf9d-4864-8bcb-8ee2323a49bd",
    text: "They are men"
  }) {
    id
    text
    language {
      id
      name
    }
  }
}

Get all translations of a sentence
query getSentence {
  getSentence(id:"5572195e-93ec-4d65-a141-3d35e6dd9705") {
    id
    text
    translations{
      id
      text
      language {
        id
        name
      }
    }
  }
}

Get available translations
query getSentence2 {
  getSentence(id:"5572195e-93ec-4d65-a141-3d35e6dd9705") {
    id
    text
    availableTranslations {
      id
      name
    }
  }
}
```

### Translation API

```
query getTranslationByLanguage {
	getTranslation(sentenceId:"14cef88e-ebd3-4565-bb40-6d4bd9856a17", languageName:"Chinese") {
    id
    text
  }
}
```

## NestJS GrapQL Example repo

```
https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first
```

## Prisma CLI command

https://www.prisma.io/docs/reference/api-reference/command-reference

## Prisma Quick Start TypeScript

https://www.prisma.io/docs/getting-started/quickstart-typescript

## Complete Graphql playground

https://blog.logrocket.com/complete-guide-to-graphql-playground/

## Nice to have features

- Authentication
- Deploy to Heroku
- Swagger API documentation
- GraphQL unit tests

## License

Nest is [MIT licensed](LICENSE).
