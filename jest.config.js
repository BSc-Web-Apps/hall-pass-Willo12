module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  moduleNameMapper: {
    "^~/(.*)": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@rn-primitives|react-native-.*|@react-native-community)/)",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFiles: ["<rootDir>/node_modules/react-native/jest/setup.js"],
  testEnvironment: "node",
};
