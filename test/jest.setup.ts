// __mocks__/firestoreRepository.ts
import { Timestamp } from "firebase-admin/firestore";
import { Events } from "../src/api/v1/models/eventsModel";

/**
 * Global mock for Firestore repository.
 *
 * This mock simulates Firestore CRUD operations for unit testing purposes,
 * so that tests can run without a real Firestore instance.
 */
export const firestoreRepository = {
    /**
     * Mock createDocument method
     * Simulates creating a document and returns the input data
     * @param _collection - Name of the Firestore collection (ignored in mock)
     * @param data - The event data to "create"
     * @returns Resolves with the same event data
     */
    createDocument: jest.fn().mockImplementation(async (_collection: string, data: Events) => {
        return data;
    }),

    /**
     * Mock getDocuments method
     * Simulates fetching all documents in a collection
     * @param _collection - Name of the Firestore collection (ignored in mock)
     * @returns Resolves with an object containing mock docs array
     */
    getDocuments: jest.fn().mockImplementation(async (_collection: string) => {
        return {
        docs: [
            {
            id: "evt_000001",
            data: () => ({
                name: "Mock Event 1",
                date: Timestamp.fromDate(new Date("2025-12-25T09:00:00.000Z")),
                capacity: 100,
                registrationCount: 0,
                status: "active",
                category: "conference",
                createdAt: Timestamp.fromDate(new Date("2025-12-18T21:24:50.029Z")),
                updatedAt: Timestamp.fromDate(new Date("2025-12-18T21:24:50.029Z")),
            }),
            },
            {
            id: "evt_000002",
            data: () => ({
                name: "Mock Event 2",
                date: Timestamp.fromDate(new Date("2025-12-26T09:00:00.000Z")),
                capacity: 50,
                registrationCount: 10,
                status: "active",
                category: "workshop",
                createdAt: Timestamp.fromDate(new Date("2025-12-18T21:25:50.029Z")),
                updatedAt: Timestamp.fromDate(new Date("2025-12-18T21:25:50.029Z")),
            }),
            },
        ],
        };
    }),

    /**
     * Mock getDocumentById method
     * Simulates fetching a single document by ID
     * @param _collection - Name of the Firestore collection (ignored in mock)
     * @param id - ID of the document to fetch
     * @returns Resolves with a mock document object or a non-existent placeholder
     */
    getDocumentById: jest.fn().mockImplementation(async (_collection: string, id: string) => {
        const mockData: Record<string, any> = {
        "evt_000001": {
            id: "evt_000001",
            exists: true,
            data: () => ({
            name: "Mock Event 1",
            date: Timestamp.fromDate(new Date("2025-12-25T09:00:00.000Z")),
            capacity: 100,
            registrationCount: 0,
            status: "active",
            category: "conference",
            createdAt: Timestamp.fromDate(new Date("2025-12-18T21:24:50.029Z")),
            updatedAt: Timestamp.fromDate(new Date("2025-12-18T21:24:50.029Z")),
            }),
        },
        "evt_000002": {
            id: "evt_000002",
            exists: true,
            data: () => ({
            name: "Mock Event 2",
            date: Timestamp.fromDate(new Date("2025-12-26T09:00:00.000Z")),
            capacity: 50,
            registrationCount: 10,
            status: "active",
            category: "workshop",
            createdAt: Timestamp.fromDate(new Date("2025-12-18T21:25:50.029Z")),
            updatedAt: Timestamp.fromDate(new Date("2025-12-18T21:25:50.029Z")),
            }),
        },
        };

        return mockData[id] ?? { id, exists: false, data: () => null };
    }),

    /**
     * Mock updateDocument method
     * Simulates updating a document and returns the updated data
     * @param _collection - Firestore collection name (ignored in mock)
     * @param _id - Document ID to update (ignored in mock)
     * @param data - Updated event data
     * @returns Resolves with the updated event data
     */
    updateDocument: jest.fn().mockImplementation(async (_collection: string, _id: string, data: Events) => {
        return data;
    }),

    /**
     * Mock deleteDocument method
     * Simulates deleting a document
     * @param _collection - Firestore collection name (ignored in mock)
     * @param _id - Document ID to delete (ignored in mock)
     * @returns Resolves with void
     */
    deleteDocument: jest.fn().mockImplementation(async (_collection: string, _id: string) => {
        return;
    }),
};

/**
 * Clear all mock call history after each test
 * Ensures no test interference from previous calls
 */
afterEach(() => {
  jest.clearAllMocks();
});

/**
 * Reset all mock modules after all tests complete
 * Ensures a clean state for future tests
 */
afterAll(() => {
  jest.resetModules();
});