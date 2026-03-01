import { Request, Response } from "express";
import * as Service from "../services/Service";
import { HealthCheckResponse } from "../../../interface_properties";
import { ValidationError } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Events } from "../models/eventsModel";

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

export const allEventsController = async (req: Request, res: Response):Promise<void> => {
    try {
        const allEvents = await Service.getAllEvents();
        const count:number = allEvents.length;
        res.status(HTTP_STATUS.OK).json({ message:"Events retrieved", count:count, data: allEvents });
    }catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const singleEventController = async (req: Request<{ id:string }>, res: Response):Promise<Response> => {
    try {
        const id:string = req.params.id;
        if(!id){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event ID is not found"});
        }
        const event = await Service.getEvent(id);
        if(!event){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event is not found"});
        }
        return res.status(HTTP_STATUS.OK).json({ message:"Event retrieved", data: event });
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const updateEventController = async (req: Request<{ id:string }, Partial<Events>>, res: Response): Promise<Response> => {
    try {
        const id:string = req.params.id;
        if(!id){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event ID is not found"});
        }
        const data:Partial<Events> = req.body;
        const updateEvent = await Service.updateEvent(id, data);
        if(!updateEvent){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event is not found"});
        }
        return res.status(HTTP_STATUS.OK).json({message:"Event updated", data: updateEvent});
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }  
};

export const deleteEventController = async (req: Request<{ id:string }>, res: Response): Promise<Response> => {
    try{
        const id:string = req.params.id;
        if(!id){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event ID is not found"});
        }
        const deleteevent = await Service.deleteEvent(id);
        if(!deleteevent){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event is not found"});
        }
        return res.status(HTTP_STATUS.OK).json({ message: `${id} deleted`, data: deleteevent });
    }catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Unknown error" });
    }
  }  
};