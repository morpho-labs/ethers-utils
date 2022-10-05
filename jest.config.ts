export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/test/**/*.spec.ts"],
    setupFilesAfterEnv: ["./test/setup/jest.matchers.ts"],
    collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/types/**/*.ts"],
    globals: {
        "ts-jest": {
            diagnostics: false,
            isolatedModules: true,
        },
    },
};
