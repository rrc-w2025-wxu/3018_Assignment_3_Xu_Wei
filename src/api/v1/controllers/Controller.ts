import { Request, Response, NextFunction } from "express";
import * as postService from "../services/postService";
import { successResponse } from "../models/responseModel";
import { HealthCheckResponse } from "src/interface_properties";

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


export const items
