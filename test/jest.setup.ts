// Mock firestoreRepository instead of firebaseConfig
jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
  createDocument: jest.fn().mockResolvedValue("mocked_id"),
}));

afterEach(() => {
  jest.clearAllMocks();
});