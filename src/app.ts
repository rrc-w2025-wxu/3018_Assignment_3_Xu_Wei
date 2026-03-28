
import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";

import { getHelmetConfig } from "../config/helmetConfig";

import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();


app.use(getHelmetConfig());
// Define a route
app.use("/api/v1", router);

export default app;