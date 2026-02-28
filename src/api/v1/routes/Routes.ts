import express from "express";
import { validateRequest } from "../middleware/validate";
import * as Controller from "../controllers/Controller";
import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/Controller";

const router = express.Router();

// Health check endpoint
router.get("/health", itemsHealthCheck);

// Create post - validates body only
router.post(
    "/",
    validateRequest(Schemas.create),
    Controller.createPost
);

// Create post - validates body only
router.post(
    "/",
    validateRequest(Schemas.create),
    Controller.createPost
);

// Get single post - validates params and optional query
router.get(
    "/:id",
    validateRequest(Schemas.getById),
    Controller.getPost
);

// Update post - validates both params and body
router.put(
    "/:id",
    validateRequest(Schemas.update),
    Controller.updatePost
);

// Delete post - validates params only
router.delete(
    "/:id",
    validateRequest(Schemas.delete),
    Controller.deletePost
);

// List posts - validates query parameters for filtering/pagination
router.get("/", validateRequest(Schemas.list), Controller.listPosts);

// Example with custom validation options
router.post(
    "/flexible",
    validateRequest(Schemas.create, { stripBody: false }),
    Controller.createPostFlexible
);

export default router;