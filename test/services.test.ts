import request from "supertest";
import app from "../src/app"; // Express app
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Events Controller", () => {
  describe("POST /api/v1/events", () => {
    it("should create a new event and return message + data", async () => {
      const payload = {
        name: "Tech Workshop",
        date: "2025-12-25T09:00:00.000Z",
        capacity: 50,
        registrationCount: 0,
        status: "active",
        category: "workshop",
      };

      const response = await request(app)
        .post("/api/v1/events")
        .send(payload);

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body).toHaveProperty("message", "Event created");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe(payload.name);
      expect(response.body.data.capacity).toBe(payload.capacity);
    });
  });

  describe("GET /api/v1/events", () => {
    it("should return all events", async () => {
      const response = await request(app).get("/api/v1/events");

      expect(response.status).toBe(HTTP_STATUS.OK);
      expect(response.body).toHaveProperty("message", "Events retrieved");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty("id");
      expect(response.body.data[0]).toHaveProperty("name");
    });
  });
});