import { describe, it, expect } from "@jest/globals";
import { Schemas } from "../src/api/v1/validation/Schemas";

describe("Event Schema Validation (Joi)", () => {

    // Valid data should pass
    it("should pass with valid event data", () => {
        // Arrange
        const validEvent = {
        name: "Tech Conference",
        date: new Date("2026-12-20"),
        capacity: 50,
        registrationCount: 10,
        status: "active",
        category: "conference",
        };
        // Act
        const { error } = Schemas.create.body.validate(validEvent);
        // Assert
        expect(error).toBeUndefined();
    });

    // Name too short
    it("should fail if name is less than 3 characters", () => {
        // Arrange
        const invalidEvent = {
        name: "AB",
        date: new Date("2026-12-20"),
        capacity: 50,
        registrationCount: 10,
        status: "active",
        category: "conference",
        };
        // Act
        const { error } = Schemas.create.body.validate(invalidEvent);
        // Assert
        expect(error).toBeDefined();
        expect(error?.message).toContain("length must be at least 3");
    });

    // Capacity less than 5
    it("should fail if capacity is less than 5", () => {
        // Arrange
        const invalidEvent = {
        name: "Tech Conference",
        date: new Date("2026-12-20"),
        capacity: 3,
        registrationCount: 1,
        status: "active",
        category: "conference",
        };
        // Act
        const { error } = Schemas.create.body.validate(invalidEvent);
        // Assert
        expect(error).toBeDefined();
        expect(error?.message).toContain("greater than or equal to 5");
    });

    // registrationCount > capacity
    it("should fail if registrationCount exceeds capacity", () => {
        // Arrange
        const invalidEvent = {
        name: "Tech Conference",
        date: new Date("2026-12-20"),
        capacity: 10,
        registrationCount: 20,
        status: "active",
        category: "conference",
        };
        // Act
        const { error } = Schemas.create.body.validate(invalidEvent);
        // Assert
        expect(error).toBeDefined();
        expect(error?.message).toContain("less than or equal to capacity");
    });

});