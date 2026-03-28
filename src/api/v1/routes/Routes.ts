import express from "express";
import { validateRequest } from "../middleware/validate";
import * as Controller from "../controllers/Controller";
import { Schemas } from "../validation/Schemas";
import { itemsHealthCheck } from "../controllers/Controller";

const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the items service. Used for monitoring.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get("/health", itemsHealthCheck);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     description: Creates a new event in the system. The request body must follow the create event schema.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvent'
 *           example:
 *             title: "Board Meeting"
 *             date: "2026-04-01T10:00:00Z"
 *             location: "Conference Room 1"
 *             description: "Monthly strategy meeting"
 *     responses:
 *       201:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *             example:
 *               id: "evt_12345"
 *               title: "Board Meeting"
 *               date: "2026-04-01T10:00:00Z"
 *               location: "Conference Room 1"
 *               description: "Monthly strategy meeting"
 *               createdAt: "2026-03-28T10:15:00Z"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.post("/events", 
    validateRequest(Schemas.create), 
    Controller.createController
);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve all events
 *     description: Returns a list of all events stored in the system.
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *             example:
 *               - id: "evt_12345"
 *                 title: "Board Meeting"
 *                 date: "2026-04-01T10:00:00Z"
 *                 location: "Conference Room 1"
 *                 description: "Monthly strategy meeting"
 *                 createdAt: "2026-03-28T10:15:00Z"
 *               - id: "evt_12346"
 *                 title: "Team Lunch"
 *                 date: "2026-04-05T12:30:00Z"
 *                 location: "Cafeteria"
 *                 description: "Quarterly team lunch"
 *                 createdAt: "2026-03-28T10:20:00Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get("/events", Controller.allEventsController);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     description: Returns a single event object by its unique ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event
 *         schema:
 *           type: string
 *           example: "evt_12345"
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *             example:
 *               id: "evt_12345"
 *               title: "Board Meeting"
 *               date: "2026-04-01T10:00:00Z"
 *               location: "Conference Room 1"
 *               description: "Monthly strategy meeting"
 *               createdAt: "2026-03-28T10:15:00Z"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid event ID"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event with ID evt_12345 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.get(
    "/events/:id",
    validateRequest(Schemas.getById),
    Controller.singleEventController
);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event by ID
 *     description: Updates the details of an existing event. The request body must follow the update event schema.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event to update
 *         schema:
 *           type: string
 *           example: "evt_12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEvent'
 *           example:
 *             title: "Updated Board Meeting"
 *             date: "2026-04-02T14:00:00Z"
 *             location: "Conference Room 2"
 *             description: "Updated monthly strategy meeting"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *             example:
 *               id: "evt_12345"
 *               title: "Updated Board Meeting"
 *               date: "2026-04-02T14:00:00Z"
 *               location: "Conference Room 2"
 *               description: "Updated monthly strategy meeting"
 *               createdAt: "2026-03-28T10:15:00Z"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Title is required"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event with ID evt_12345 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.put("/events/:id", 
    validateRequest(Schemas.update), 
    Controller.updateEventController
);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     description: Deletes an existing event from the system by its unique ID.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event to delete
 *         schema:
 *           type: string
 *           example: "evt_12345"
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event deleted successfully"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid event ID"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event with ID evt_12345 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
router.delete("/events/:id", 
    validateRequest(Schemas.delete),
    Controller.deleteEventController
);

export default router;
