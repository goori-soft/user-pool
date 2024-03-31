/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    "\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1'
  }
};

module.exports = config;
