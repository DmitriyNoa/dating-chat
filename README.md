# Dating chat
# About
This is simple chat application on NodeJS, ExpressJS and Socket.io, written with TypeScript and Angular 4.

### Installation
Clone the repo and install npm dependencies:
```sh
$ git clone https://github.com/DmitriyNoa/dating-chat.git
$ cd dating-chat
$ npm install
```
### Running locally
Start MongoDB
$ mongod

Run socket service
```sh
$ npm start
```
Run chat front-end application in new terminal window
```sh
$ npm run start-client
```
Open http://localhost:4200 in your browser.

### Running on production
```sh
$ npm run build
$ npm run start-production
```
### Tests
Run socket service tests
```sh
$ npm test
```
Run front-end chat application unit tests
```sh
$ npm run client-test
```
Run end to end tests
```sh
$ npm run e2e
```
