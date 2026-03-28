import express, { Express } from "express";
import dotenv from "dotenv";
// Load environment variables BEFORE your internal imports!
dotenv.config();
import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

// Define a route
app.use("/api/v1", router);

export default app;