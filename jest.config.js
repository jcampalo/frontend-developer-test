module.exports = {
  preset: 'jest-expo',
  collectCoverageFrom: [
    'src/**/*.js',
    '__tests__',
  ],
  testMatch: ['**/__tests__/?(*.)+(test).js'],
  coverageReporters: [
    'text',
    'lcov',
    'cobertura',
  ],
};
