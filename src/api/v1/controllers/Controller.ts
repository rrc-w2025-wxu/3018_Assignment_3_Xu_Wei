import { Request, Response } from "express";
import * as Service from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
import { ValidationError } from "joi";

/**
 * Check the health status of the service.
 *
 * GET /api/v1/health
 *
 * @param req - Express Request
 * @param res - Express Response
 */
export const itemsHealthCheck = (req: Request, res: Response): void => {
    const healthCheck:HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };
    res.json(healthCheck);
}

export const createController = async (req: Request, res: Response) => {
    try {
        
        const newEventData = await Service.createEvent(req.body);

        res.status(200).json({
            message: "Event created",
            data: newEventData,
        });
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            const firstMessage = error.details[0]?.message ?? "Validation error";
            res.status(400).json({ message: firstMessage });
        } else if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};