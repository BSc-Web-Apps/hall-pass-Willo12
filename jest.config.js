module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  moduleNameMapper: {
    "^~/(.*)": "<rootDir>/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@rn-primitives|react-native-.*|@react-native-community|@react-navigation)/)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFiles: [
    "<rootDir>/node_modules/react-native/jest/setup.js",
    "<rootDir>/jest.setup.js"
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  globals: {
    "__DEV__": true
  }
};
