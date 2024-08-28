/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    moduleNameMapper: {
        // ...
        '^@/(.*)$': '<rootDir>/$1',
        '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/services/(.*)$': '<rootDir>/services/$1',
        '^@/providers/(.*)$': '<rootDir>/providers/$1',
        '^@/models/(.*)$': '<rootDir>/models/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
        '^@/styles/(.*)$': '<rootDir>/styles/$1',
        '^@/guards/(.*)$': '<rootDir>/guards/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
};

export default createJestConfig(config);
