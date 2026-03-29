// test/services.test.ts

// 1️⃣ 必须在 Service 导入前 mock
jest.mock("../config/firebaseConfig", () => ({
  // 如果 Service 里没有直接用 initializeFirebaseAdmin，可以直接 mock 空对象
  initializeFirebaseAdmin: jest.fn(() => ({})),
}));

jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  createDocument: jest.fn(async (_c, d) => ({ ...d, id: "mock_id" })),
  getDocuments: jest.fn(async () => ({
    docs: [
      {
        id: "evt_000001",
        data: () => ({
          name: "Mock Event 1",
          date: new Date("2025-12-25T09:00:00.000Z"),
          capacity: 100,
          registrationCount: 0,
          status: "active",
          category: "conference",
        }),
      },
    ],
  })),
  getDocumentById: jest.fn(async (_c, id) => ({
    id,
    exists: true,
    data: () => ({
      name: `Mock Event ${id}`,
      date: new Date("2025-12-25T09:00:00.000Z"),
      capacity: 100,
      registrationCount: 0,
      status: "active",
      category: "conference",
    }),
  })),
  updateDocument: jest.fn(async (_c, _id, d) => ({ ...d, id: _id })),
  deleteDocument: jest.fn(async (_c, _id) => ({ id: _id })),
}));

// 2️⃣ 再导入 Service
import { createEvent, getAllEvents, getEvent, updateEvent, deleteEvent } from "../src/api/v1/services/Service";
import { Events } from "../src/api/v1/models/eventsModel";

// 3️⃣ 测试用例
describe("Event Service", () => {
  it("should create a new event", async () => {
    const data: Partial<Events> = {
      name: "Test Event",
      date: new Date("2025-12-25T09:00:00.000Z"),
      capacity: 100,
    };
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