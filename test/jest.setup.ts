// __mocks__/firestoreRepository.ts
import { Timestamp } from "firebase-admin/firestore";
import { Events } from "../src/api/v1/models/eventsModel";

// 全局 mock Firestore Repository
export const firestoreRepository = {
  // createDocument 模拟直接返回对象
  createDocument: jest.fn().mockImplementation(async (_collection: string, data: Events) => {
    return data;
  }),

  // getDocuments 模拟返回带 docs 的对象
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

  // getDocumentById 模拟返回单个文档
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

  // updateDocument 模拟直接返回
  updateDocument: jest.fn().mockImplementation(async (_collection: string, _id: string, data: Events) => {
    return data;
  }),

  // deleteDocument 模拟直接返回
  deleteDocument: jest.fn().mockImplementation(async (_collection: string, _id: string) => {
    return;
  }),
};

// 每个测试后清空 mock 调用记录
afterEach(() => {
  jest.clearAllMocks();
});

// 所有测试结束后重置模块
afterAll(() => {
  jest.resetModules();
});