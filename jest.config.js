module.exports = {
  preset: 'react-native',
  // setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: [
    './setup-jest.ts',
    '@testing-library/jest-native/extend-expect',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-navigation|/.*)/',
  ],
  coveragePathIgnorePatterns: [
    './src/constants/',
    './src/utils/',
    './src/store/',
    './src/helper/',
    './src/router/',
  ],
  modulePathIgnorePatterns: ['./__tests__/utils/TestUtils.test.tsx'],
  moduleNameMapper: {
    // '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg',
  },
};
