
/**
 * Jest configuration file
 *
 * This configuration sets up Jest to work with a TypeScript project
 * using ts-jest and a Node.js test environment.
 */
module.exports = {
    /**
     * Use ts-jest preset to allow Jest to transpile TypeScript files
     * before running tests.
     */
    preset: "ts-jest",

    /**
     * Set the test environment to Node.js.
     * This is required for backend/server-side testing.
     */
    testEnvironment: "node",

    /**
     * Specify setup files to be executed after the test framework
     * is installed in the environment.
     * Typically used for global mocks or test initialization.
     */
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};