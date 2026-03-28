
import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));
setupSwagger(app);

// Define a route
app.use("/api/v1", router);

export default app;