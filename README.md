https://rrc-w2025-wxu.github.io/3018_Assignment_3_Xu_Wei/

# Assignment 5

## Project Overview
 - This is an event registration API. Event administrators can use 
 this API to manage events. They can use this API to query all events, 
 individual events, create new events, update events, and delete events.

 - To ensure accuracy, the schema is used to validate the operation 
 information before querying, creating, updating, and deleting events. 
 Only after successful validation can the event be operated on.

 ## Installation Instructions
 - npm init -y(initializes a new Node.js project)
 - npm install typescript ts-node @types/node --save-dev(Install TypeScript)
 - Create tsconfig.json
 - Update package.json
 - npm install express(Install Express)
 - npm install @types/express --save-dev
 - Create app.ts
 - Create server.ts
 - Update package.json
 - npm start(Run the Server)
 - npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
 (install Jest and its related packages)
 - Create a jest.config.js file
 - Update package.json with test
 - npm install morgan @types/morgan(Install Morgan)
 - npm install firebase-admin
 - npm install joi
 - npm install @types/joi --save-dev
 - npm install ts-node typescript --save-dev
 - npm install dotenv
 - npm install helmet
 - npm install cors
 - npm install --save-dev @types/cors
 - npm install swagger-ui-express swagger-jsdoc
 - npm install --save-dev @types/swagger-jsdoc
 - npm install -D @redocly/cli
 - npm run generate-docs
 - npx @redocly/cli build-docs openapi.json --output docs/index.html

## API Request Examples