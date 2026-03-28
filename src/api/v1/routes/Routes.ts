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
 *     description: Creates a new event in the system. All fields must satisfy the validation rules defined in the create event schema.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Board Meeting"
 *                 description: "The name of the event. Must be at least 3 characters long."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-01T10:00:00Z"
 *                 description: "The date of the event. Must be later than 2025-12-17T21:24:50.029Z."
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 50
 *                 description: "Maximum number of attendees. Must be an integer ≥ 5."
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *                 description: "The status of the event."
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "conference"
 *                 description: "The category of the event."
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 0
 *                 description: "The number of registered attendees. Must be less than or equal to capacity."
 *     responses:
 *       201:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "evt_12345"
 *                 name:
 *                   type: string
 *                   example: "Board Meeting"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-04-01T10:00:00Z"
 *                 capacity:
 *                   type: integer
 *                   example: 50
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 category:
 *                   type: string
 *                   example: "conference"
 *                 registrationCount:
 *                   type: integer
 *                   example: 0
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-03-28T10:15:00Z"
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "\"name\" is required, \"capacity\" must be greater than or equal to 5"
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
 *     description: Returns a single event object by its unique ID. The "id" parameter is required and must be a non-empty string.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event. Cannot be empty.
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
 *               name: "Board Meeting"
 *               date: "2026-04-01T10:00:00Z"
 *               capacity: 50
 *               status: "active"
 *               category: "conference"
 *               registrationCount: 0
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
 *                   example: "ID is required"
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
 *     description: Updates the details of an existing event. The request body fields are all optional but must satisfy the validation rules defined in the update event schema.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event to update. Cannot be empty.
 *         schema:
 *           type: string
 *           example: "evt_12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Updated Board Meeting"
 *                 description: "The name of the event. Optional. If provided, must be at least 3 characters long."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-02T14:00:00Z"
 *                 description: "The date of the event in ISO format. Optional."
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 50
 *                 description: "Maximum number of attendees. Optional. Must be an integer ≥ 5."
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 10
 *                 description: "Number of registered attendees. Optional. Must be ≤ capacity."
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *                 description: "Status of the event. Optional."
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "conference"
 *                 description: "Category of the event. Optional."
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *             example:
 *               id: "evt_12345"
 *               name: "Updated Board Meeting"
 *               date: "2026-04-02T14:00:00Z"
 *               capacity: 50
 *               status: "active"
 *               category: "conference"
 *               registrationCount: 10
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
 *                   example: "ID is required, capacity must be ≥ 5"
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
 *     description: Deletes an existing event from the system by its unique ID. The "id" parameter is required and cannot be empty.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the event to delete. Cannot be empty.
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
 *                   example: "ID is required"
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
