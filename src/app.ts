
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
app.use(express.json());
app.use(getHelmetConfig());
//app.use(cors(getCorsOptions()));
app.use(cors({
  origin: "*",         
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],       
}));

setupSwagger(app);

// Define a route
app.use("/api/v1", router);

export default app;