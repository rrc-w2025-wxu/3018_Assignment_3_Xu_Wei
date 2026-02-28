import * as firestoreRepository from "../repositories/firestoreRepository";
import { Schemas } from "../validation/Schemas";
import { validateRequest } from "../middleware/validate";
import { Events } from "../models/eventsModel";

// Generate IDs like evt_000001
let eventCounter = 0;
const generateEventId = (): string => {
    eventCounter += 1;
    return `evt_${eventCounter.toString().padStart(6, "0")}`;
};

/**
 * Updates an existing post.
 * @param {Events} data - The updated events data.
 * @returns {Promise<void>}
 * @throws {Error} - If validation or repository operation fails.
 */
export const createEvent = async (data: Partial<Events>): Promise<void> => {
    try {
        const newId = generateEventId();

        const eventData: Events = {
            id: newId,
            name: data.name || "Untitled Event",
            date: data.date || new Date(),
            capacity: data.capacity || 0,
            registrationCount: data.registrationCount || 0,
            status: data.status || "active",
            category: data.category || "general",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        validateRequest(Schemas.create, data);
        await firestoreRepository.createDocument("events", eventData, newId);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to update post ${data.id}: ${errorMessage}`
        );
    }
};