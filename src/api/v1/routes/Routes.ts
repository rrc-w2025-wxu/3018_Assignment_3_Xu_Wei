import express from "express";
import { validateRequest } from "../middleware/validate";
import * as Controller from "../controllers/Controller";
import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/Controller";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

// Create event - validates body only
router.post("/events", validateRequest(Schemas.create), Controller.createController);

// Get all events - validates body only
router.get("/events", Controller.allEventsController);

// Get a single event - validates body only
router.get("/events/:id", Controller.allEventsController);

// Update a single event - validates body only
router.put("/events/:id", Controller.allEventsController);

// Delete a single event - validates body only
router.delete("/events/:id", Controller.allEventsController);

export default router;