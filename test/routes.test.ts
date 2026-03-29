
import request, { Response } from "supertest";
import app from "../src/app";

describe("Basic Route Tests", () => {
    /**
     * Test the health check endpoint.
     */
    describe("GET /api/v1/health", () => {
        it("should return a valid health check response", async () => {
            // Act
            const response: Response = await request(app).get("/api/v1/health");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: "OK",
                uptime: expect.any(Number),
                timestamp: expect.any(String),
                version: "1.0.0",
            });
        });
    });
});