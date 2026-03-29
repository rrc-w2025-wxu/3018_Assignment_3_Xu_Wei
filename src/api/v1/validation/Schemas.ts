import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event
 *           minLength: 3
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the event (must be in the future)
 *         capacity:
 *           type: integer
 *           description: Maximum number of attendees
 *           minimum: 5
 *         status:
 *           type: string
 *           description: Current status of the event
 *           enum: [active, cancelled, completed]
 *         category:
 *           type: string
 *           description: Category of the event
 *           enum: [conference, workshop, meetup, seminar, general]
 *         registrationCount:
 *           type: integer
 *           description: Current number of registered attendees
 *           minimum: 0
 */

/**
 * @description Joi validation schemas for Events operations
 */
export const Schemas = {
    /** 
   * Schema for creating a new event
   * @openapi
   * /events:
   *   post:
   *     summary: Create a new event
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Event'
   */
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": "\"name\" is required",
                "string.min": "\"name\" length must be at least 3 characters long",
            }),
            date: Joi.date().greater("2025-12-17T21:24:50.029Z").required().messages({
                "any.required": "\"date\" is required",
                "date.greater": "\"date\" must be greater than \"now\"",
            }),
            capacity: Joi.number().min(5).integer().required().messages({
                "any.required": "\"capacity\" is required",
                "number.min": "\"capacity\" must be greater than or equal to 5",
                "number.integer":"\"capacity\" must be an integer",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").messages({
                "any.only": "\"status\" must be one of [active, cancelled, completed]",
            }),
            category: Joi.string()
                         .valid("conference", "workshop", "meetup", "seminar", "general")
                         .messages({
                            "any.only": "\"category\" must be one of [conference, workshop, meetup, seminar, general]",
            }),
            registrationCount: Joi.number().min(0).max(Joi.ref("capacity")).messages({
                "number.max": "\"registrationCount\" must be less than or equal to capacity",
            }),
        }),
    },

    /**
   * Schema for retrieving an event by ID
   * @openapi
   * /events/{id}:
   *   get:
   *     summary: Get a single event by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   */
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            }),
        }),
    },

    /**
   * Schema for updating an event by ID
   * @openapi
   * /events/{id}:
   *   put:
   *     summary: Update an event by ID
   */
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            date: Joi.date().iso().optional(),
            capacity: Joi.number().integer().min(5).optional(),
            registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).optional(),
            status: Joi.string().valid("active", "cancelled", "completed").optional(),
            category: Joi.string().valid("conference","workshop","meetup","seminar","general").optional(),
        }),
    },

    /**
   * Schema for deleting an event by ID
   * @openapi
   * /events/{id}:
   *   delete:
   *     summary: Delete an event by ID
   */
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            }),
        }),
    },
};