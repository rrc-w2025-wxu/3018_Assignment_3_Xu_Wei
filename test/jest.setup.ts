import { Events } from "../src/api/v1/models/eventsModel";

// 全局 mock firestoreRepository
jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  // createDocument 返回原对象（不要返回字符串）
  createDocument: jest.fn().mockImplementation(async (_collection: string, data: Events) => {
    return data; // 返回事件对象
  }),
  // getAllEvents 返回一个数组
  getAllEvents: jest.fn().mockResolvedValue([
    {
      id: "evt_000001",
      name: "Mock Event 1",
      date: new Date("2025-12-25T09:00:00.000Z"),
      capacity: 100,
      registrationCount: 0,
      status: "active",
      category: "conference",
      createdAt: new Date("2025-12-18T21:24:50.029Z"),
      updatedAt: new Date("2025-12-18T21:24:50.029Z"),
    },
    {
      id: "evt_000002",
      name: "Mock Event 2",
      date: new Date("2025-12-26T09:00:00.000Z"),
      capacity: 50,
      registrationCount: 10,
      status: "active",
      category: "workshop",
      createdAt: new Date("2025-12-18T21:25:50.029Z"),
      updatedAt: new Date("2025-12-18T21:25:50.029Z"),
    },
  ]),
}));

// 每个测试后清空 mock 调用记录
afterEach(() => {
  jest.clearAllMocks();
});

// 所有测试结束后重置模块
afterAll(() => {
  jest.resetModules();
});