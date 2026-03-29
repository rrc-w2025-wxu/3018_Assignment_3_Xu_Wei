
import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";
import { getHelmetConfig } from "../config/helmetConfig";
//import { getCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

app.use(getHelmetConfig());
//app.use(cors(getCorsOptions()));
app.use(cors({
  origin: "*",            // 或者你前端的 URL
  credentials: true        // 如果前端要带 cookie / Authorization
}));

setupSwagger(app);

// Define a route
app.use("/api/v1", router);

export default app;