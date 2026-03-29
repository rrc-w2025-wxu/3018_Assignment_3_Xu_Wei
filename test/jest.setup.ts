// __mocks__/firestoreRepository.ts
/// <reference types="jest" />

import { Timestamp } from "firebase-admin/firestore";
import { Events } from "../src/api/v1/models/eventsModel";

const firestoreRepository = {
  createDocument: jest.fn(async (_collection: string, data: Omit<Events, "id">) => {
    return { ...data, id: "mock_id" };
  }),

  getDocuments: jest.fn(async (_collection: string) => {
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

  getDocumentById: jest.fn(async (_collection: string, id: string) => {
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

  updateDocument: jest.fn(async (_collection: string, _id: string, data: Omit<Events, "id">) => {
    return { ...data, id: _id };
  }),

  deleteDocument: jest.fn(async (_collection: string, _id: string) => {
    return; // Firestore delete 实际是 void
  }),
};

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetModules();
});

export default firestoreRepository;