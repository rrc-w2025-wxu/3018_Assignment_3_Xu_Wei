/**
 * Represents the response structure for the Health Check API.
 */

export interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

/**
 * Represents the allowed priority levels for a ticket.
 */
export type Priority = "low" | "medium" | "high" | "critical";

/**
 * Represents the allowed status values for a ticket.
 */
export type Status = "open" | "in-progress" | "resolved";

/**
 * Represents a ticket in the system.
 */
export interface Tickets {
    id : number;
    title : string;
    description : string;
    priority : Priority;
    status : Status;
    createdAt : Date;
    currentTime? : Date;
    ticketAge? : number;
    urgencyScore? : number;
    urgencyLevel? : string;
}

/**
 * Represents a ticket object without the 'currentTime' property.
 * Useful when returning ticket data without exposing internal timestamps.
 */
export type TicketOmit = Omit<Tickets, "currentTime">;

/**
 * Represents a ticket object with only the most essential fields.
 * Useful for summaries or lightweight responses.
 */
export type TicketPick = Pick<Tickets, "id" | "title" | "description" | "priority" | "status" | "createdAt">;