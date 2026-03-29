
import { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } from "../src/api/v1/services/Service";
import { Events } from "../src/api/v1/models/eventsModel";


/**
 * Unit tests for the Event Service functions.
 *
 * These tests use the mocked Firestore repository to verify
 * that each service function behaves correctly.
 */
describe("Event Service", () => {
    /**
     * Test creating a new event
     * Ensures that createEvent returns an event object with an id
     * and the correct name
   */
    it("should create a new event", async () => {
        // Arrange
        const data: Partial<Events> = { 
            name: "Test Event", 
            date: new Date("2025-12-25T09:00:00.000Z"),
            capacity: 100 };
        // Act
        const event = await createEvent(data);
        // Assert
        expect(event).toHaveProperty("id");
        expect(event.name).toBe("Test Event");
    });

    /**
     * Test fetching all events
     * Ensures getAllEvents returns an array of events
     * and each event has an id property
   */
    it("should get all events", async () => {
        // Act
        const events = await getAllEvents();
        // Assert
        expect(events.length).toBeGreaterThan(0);
        expect(events[0]).toHaveProperty("id");
    });

    /**
     * Test fetching a single event by ID
     * Ensures getEvent returns the correct event object
   */
    it("should get a single event by id", async () => {
        // Act
        const event = await getEvent("evt_000001");
        // Assert
        expect(event).not.toBeNull();
        expect(event!.id).toBe("evt_000001");
    });

    /**
     * Test updating an event
     * Ensures updateEvent modifies the specified field correctly
   */
    it("should update an event", async () => {
        // Arrange & Act
        const updated = await updateEvent("evt_000001", { capacity: 200 });
        // Assert
        expect(updated!.capacity).toBe(200);
    });

    /**
     * Test deleting an event
     * Ensures deleteEvent returns the deleted event object
   */
    it("should delete an event", async () => {
        // Act
        const deleted = await deleteEvent("evt_000001");
        // Assert
        expect(deleted).toHaveProperty("id", "evt_000001");
    });
    });