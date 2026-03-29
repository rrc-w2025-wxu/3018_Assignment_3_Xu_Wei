
/**
 * Jest configuration file
 *
 * This configuration sets up Jest to work with a TypeScript project
 * using ts-jest and a Node.js test environment.
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};