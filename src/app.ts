import express, { Express } from "express";
//import router from "./api/v1/routes/Routes";

// Initialize Express application
const app: Express = express();

// Define a route
// app.use("/api/v1", router);
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;