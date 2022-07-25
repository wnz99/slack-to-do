module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [],
  preset: 'ts-jest',
  testMatch: null,
  testRegex: '.*\\.test\\.(js|ts)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['js', 'ts'],
  clearMocks: true,
}
