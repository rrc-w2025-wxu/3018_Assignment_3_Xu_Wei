
import { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } from "../src/api/v1/services/Service";
import { Events } from "../src/api/v1/models/eventsModel";

describe("Event Service", () => {
  it("should create a new event", async () => {
    const data: Partial<Events> = { 
        name: "Test Event", 
        date: new Date("2025-12-25T09:00:00.000Z"),
        capacity: 100 };
    const event = await createEvent(data);
    expect(event).toHaveProperty("id");
    expect(event.name).toBe("Test Event");
  });

  it("should get all events", async () => {
    const events = await getAllEvents();
    expect(events.length).toBeGreaterThan(0);
    expect(events[0]).toHaveProperty("id");
  });

  it("should get a single event by id", async () => {
    const event = await getEvent("evt_000001");
    expect(event).not.toBeNull();
    expect(event!.id).toBe("evt_000001");
  });

  it("should update an event", async () => {
    const updated = await updateEvent("evt_000001", { capacity: 200 });
    expect(updated!.capacity).toBe(200);
  });

  it("should delete an event", async () => {
    const deleted = await deleteEvent("evt_000001");
    expect(deleted).toHaveProperty("id", "evt_000001");
  });
});