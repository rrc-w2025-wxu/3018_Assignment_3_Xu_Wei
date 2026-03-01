import * as firestoreRepository from "../repositories/firestoreRepository";
import { Schemas } from "../validation/Schemas";
import { Events } from "../models/eventsModel";
import { validateData } from "../../../utils/validateData";

// Generate IDs like evt_000001
let eventCounter = 0;
const generateEventId = (): string => {
    eventCounter += 1;
    return `evt_${eventCounter.toString().padStart(6, "0")}`;
};

// Base timestamp
let lastTimestamp = new Date("2025-12-18T21:24:50.029Z").getTime();

const getNextTimestamp = () => {
    lastTimestamp += 1; 
    return new Date(lastTimestamp);
};


export const createEvent = async (data: Partial<Events>): Promise<Events> => {

    const validated = validateData(Schemas.create.body, data) as Partial<Events>;
    const newId = generateEventId();

    const eventData: Events = {
        id: newId,
        name: validated.name ?? "Untitled Event",
        date: validated.date ?? new Date("2025-12-25T09:00:00.000Z"), 
        capacity: validated.capacity ?? 0,
        registrationCount: validated.registrationCount ?? 0,
        status: validated.status ?? "active",
        category: validated.category ?? "general",
        createdAt: validated.createdAt ?? getNextTimestamp(),
        updatedAt: validated.updatedAt ?? getNextTimestamp(),
    };

    await firestoreRepository.createDocument<Events>("events", eventData, newId);

    return eventData;
};

export const getAllEvents = async(): Promise<Events[]> => {
    const allEvents = firestoreRepository.getAllEvents();
    return allEvents;
}