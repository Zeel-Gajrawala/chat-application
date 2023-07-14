# CHAT APPLICATION

The Chat Application is build using MEAN stack (MongoDB, Express, AngularJS and Node.js) and socket.io. View the hosted application [chat-app](https://chat-application-plum.vercel.app/auth/login).

#### Features

- MVC project structure
- Authentication with username/password
- Protected routes that can only be accessed by authenticated users
- [Mongoose](https://github.com/Automattic/mongoose) for MongoDB interactions.
- [JWT](https://jwt.io) for authentication.
- [Socket.io](https://socket.io) for implementing bidirectional channel between the Socket.IO server ([Node.js](https://nodejs.org/en/download/)) and the Socket.IO client ([Angular Framework](https://angular.io/)) that is established with a WebSocket connection whenever possible.
- RealTime Multi-User Chat System
- User Friendly UI/UX Design
- Bootstrap CSS framework

## Application Requirements

- [Node.js & NPM](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/)
- [Angular 16 & Angular CLI](https://angular.io/cli)

## Files & Folders

| File                                                                                                          | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**.env-sample**](./.env.example)                                                                             | Set custom [environment variables](https://en.wikipedia.org/wiki/Environment_variable) for your application. This is the proper way to store credentials and other sensitive values. |
| [**index.js**](./server.js)                                                                                   | Main server file that the Node.js runtime uses. It contains all the server logic.                                                                                                    |
| [**/server**](./server)                                                                                       | Folder for files used by the Node.js server                                                                                                                                          |
| [/server/models/**user.model.js**](./server/models/user.model.js)                                             | Model for storing users in MongoDB                                                                                                                                                   |
| [/server/config/**db.js**](./server/config/db.js)                                                             | Files for Database connection configurations                                                                                                                                         |
| [/server/middleware/**authenticate-user.middleware.js**](./server/middleware/authenticate-user.middleware.js) | Files used for token verification                                                                                                                                                    |
| [/server/**routes**](./server/routes)                                                                         | Folder for files used for defining different API routes                                                                                                                              |
| [/server/**controllers**](./server/controllers)                                                               | Folder for files used for defining business logic used to perform on different API routes                                                                                            |
| [**/client**](./client)                                                                                       | Angular application for manipulating and rendering data in browser                                                                                                                   |
| [/client/**views**](./client/views)                                                                           | Folder for [modules](https://angular.io/guide/architecture-modules) used to group components/pipes/directives etc.                                                                   |
| [/client/**core**](./client/core)                                                                             | [Module](https://angular.io/guide/architecture-modules) used to group services/interface/auth-guards/interceptor that can be used in entire application etc.                         |

## Running Locally

1. Clone or Download this repo onto your machine.

```bash
  git clone https://github.com/Zeel-Gajrawala/chat-application.git
```

2. Install [application requirements](#application-requirements) if not done so already.

## Run Server Locally

Perform below listed steps:

a. Open [Server](./server/) folder from application directory in your terminal and run

```bash
  npm install
```

b. Generate `.env` file on root level of server folder or Copy and rename `.env.example` to `.env`.

| Variable Name | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| PORT          | Port Number used to run server on specific port.                                      |
| MONGODB_URI   | MongoDB connection URI used to connect to a MongoDB deployment.                       |
| TOKEN_KEY     | Private key of your App that is used to sign the JWTs.                                |
| JWT_EXP       | JWT's expiration duration after which the user must re-authenticate to get a new JWT. |

c. Add above variables and its values to `.env` file (set `PORT` as `8000`).

d. To Start the NodeJS Server

```bash
  node server.js
```

e. Open http://localhost:8000/ on your browser.

## Run Client Locally

Perform below listed steps:

a. Open [Client](./client/) folder from application directory in your terminal and run

```bash
  npm install
```

b. Open [environments.ts](./client/src/environments/environment.ts) from environments folder and change the `API_ENDPOINT` if your server is not running on `Port 8000`

c. To Start the Angular Server

```bash
  npm start
```

#### OR,

```bash
  ng serve
```

`Your server is running now.`

d. Open http://localhost:4200/ on your browser to run your frontend.
