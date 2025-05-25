// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    FadeIn: { duration: jest.fn() },
    FadeOut: { duration: jest.fn() },
  };
});

// Mock nativewind
jest.mock('nativewind', () => ({
  cssInterop: (component) => component,
  styled: (component) => component,
}));

// Mock the CSS modules
jest.mock('react-native-css-interop', () => ({
  displayName: 'MockedComponent',
})); 