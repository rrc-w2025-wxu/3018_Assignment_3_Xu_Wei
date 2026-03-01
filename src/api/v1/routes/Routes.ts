import express from "express";
import { validateRequest } from "../middleware/validate";
import * as Controller from "../controllers/Controller";
import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/Controller";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

// Create post - validates body only
router.post("/events", validateRequest(Schemas.create), Controller.createController);

export default router;