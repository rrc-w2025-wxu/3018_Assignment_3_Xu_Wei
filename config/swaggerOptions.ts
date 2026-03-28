// src/config/swaggerOptions.ts
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

export const generateSwaggerSpec = () => {
  return swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Resource Library API",
        version: "1.0.0",
        description: "API documentation for the Resource Library",
      },
    },
    apis: [path.join(__dirname, "../api/v1/routes/*.ts")], 
  });
};