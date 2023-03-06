import path from "path";

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: [path.join(__dirname, "/src/utils/jest.setup.ts")],
};
