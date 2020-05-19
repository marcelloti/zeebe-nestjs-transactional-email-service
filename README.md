<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="auto" height="70" alt="Nest Logo" /></a>
  <a href="https://zeebe.io/" target="blank"><img src="https://zeebe.io/img/zeebe-logo.png" width="auto" height="70" alt="Zeebe Logo" /></a>
  <a href="https://www.elastic.co/pt/kibana" target="blank"><img src="data:image/png;base64,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" width="auto" height="70" alt="Kibana Logo" /></a>
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
    * Amazon Ses (but you can use anything else to send mails)
    * Rxjs
    * Socket.io

## Installation

```bash
$ docker-compose up -d
$ sudo dpkg -i zeebe-modeler_0.8.0.736_amd64.deb
$ cd backend && npm install

The run script needs a package called "pino-pretty". You can install it globally with:

$ npm install -g pino-pretty 
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
