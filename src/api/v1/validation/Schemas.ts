import Joi from "joi";

// Events operation schemas organized by request part
export const Schemas = {
    // POST /posts - Create new post
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
};