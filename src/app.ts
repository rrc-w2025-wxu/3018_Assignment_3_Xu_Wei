// Load environment variables from .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Import required libraries
import express, { Express } from "express";
import cors from "cors";

// Import custom configuration functions
import { getHelmetConfig } from "../config/helmetConfig";
//import { getCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

// Import application routes
import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Apply security-related HTTP headers using Helmet
app.use(getHelmetConfig());

//app.use(cors(getCorsOptions()));
// Enable CORS (Cross-Origin Resource Sharing)
// This configuration allows all origins (*) and includes credentials
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}))

// Initialize Swagger API documentation
setupSwagger(app);

// Define a route
app.use("/api/v1", router);

// Export the configured Express app
export default app;