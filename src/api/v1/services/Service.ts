import * as firestoreRepository from "../repositories/firestoreRepository";
import { Schemas } from "../validation/Schemas";
import { Events } from "../models/eventsModel";
import { validateData } from "../../../utils/validateData";
import { Timestamp } from "firebase-admin/firestore";

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
    const allEvents = await firestoreRepository.getDocuments("events");
    return allEvents.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            date: data.date instanceof Timestamp
                ? data.date.toDate().toISOString()
                : data.date,
            createdAt: data.createdAt instanceof Timestamp
                ? data.createdAt.toDate().toISOString()
                : data.createdAt,
            updatedAt: data.updatedAt instanceof Timestamp
                ? data.updatedAt.toDate().toISOString()
                : data.updatedAt,
        } as Events;
    });
}

export const getEvent = async(id:string): Promise<Events | null> => {
    const event = await firestoreRepository.getDocumentById("events", id);
    if (!event || !event.exists) return null;

    const data = event.data(); 
    if (!data) return null;

    return {
        id: event.id,
        name: data.name,
        capacity: data.capacity,
        registrationCount: data.registrationCount,
        status: data.status,
        category: data.category,
        date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : data.date,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
    } as Events;
}

export const updateEvent = async(id:string, data:Partial<Events>): Promise<Events> => {
    const event = await firestoreRepository.getDocumentById("events", id);
    if(!event || !event.exists){
        throw new Error(`Event ${id} not found`);
    }
    const eventData = event.data()!;

    const FIXED_TIME = new Date("2025-12-18T21:24:50.029Z");

    const updateEventData: Events = {
        id: event.id,
        name: data.name ?? eventData.name,
        date: data.date ?? eventData.date,
        capacity: data.capacity ?? eventData.capacity,
        registrationCount: data.registrationCount ?? eventData.registrationCount,
        status: data.status ?? eventData.status,
        category: data.category ?? eventData.category,
        createdAt: FIXED_TIME,
        updatedAt: FIXED_TIME,
    };
    await firestoreRepository.updateDocument<Events>("events", id, updateEventData);
    return updateEventData;
}