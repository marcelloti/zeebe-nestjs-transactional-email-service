<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="auto" height="70" alt="Nest Logo" /></a>
  <a href="https://zeebe.io/" target="blank"><img src="https://zeebe.io/img/zeebe-logo.png" width="auto" height="70" alt="Zeebe Logo" /></a>
  <a href="https://www.elastic.co/pt/kibana" target="blank"><img src="https://user-images.githubusercontent.com/40863789/55247735-20dbf900-5227-11e9-9885-f149e97ac587.png" width="auto" height="70" alt="Kibana Logo" /></a>
  <a href="https://camunda.com/" target="blank"><img src="https://media.licdn.com/dms/image/C4D0BAQGd8I6UwMrLMA/company-logo_200_200/0?e=2159024400&v=beta&t=XfuCsqFHOc7GOo_ExBpYAWf8Fk3UanLT5MsbMysa3hE" width="auto" height="70" alt="Camunda Operate" /></a>
  <a href="https://redis.io/" target="blank"><img src="https://secure.meetupstatic.com/photos/event/a/7/c/e/600_484422958.jpeg" width="auto" height="70" alt="Redis" /></a>
  <a href="https://rxjs-dev.firebaseapp.com/" target="blank"><img src="https://rxjs-dev.firebaseapp.com/assets/images/logos/logo.png" width="auto" height="40" alt="RxJS" /></a>
</p>








  <p align="center">Working example of NestJS using Zeebe Workflow Engine</p>

## Description

Working example of BPMN and NestJS using:
   * Zeebe Workflow Engine
* Zeebe Modeler
* Zeebe Monitor
* Camunda Operate
* Elastic Search
* Kibana
* Redis
* Amazon Ses (but you can use anything else to send mails or fake sending mail)
* Rxjs
* Socket.io

## Installation & Setup

```bash
$ docker-compose up -d
$ sudo dpkg -i zeebe-modeler_0.8.0.736_amd64.deb
$ cd backend && npm install

The "run" script needs a package called "pino-pretty". You can install it globally with:
$ npm install -g pino-pretty

Copy .env.example to .env and change the values.
```

## Running the app

```bash
$ cd backend

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

Open in browser the file "index.html" in "frontend" folder

You can open Zeebe modeler (in terminal run 'zeebe-modeler') and change the BPMN file in "backend/src/bpmn/" folder
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
# Licenses
This package is published in MIT license. All the third party packages have your own respective license.
