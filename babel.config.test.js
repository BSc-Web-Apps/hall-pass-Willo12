module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
    '@babel/preset-react',
    'babel-preset-expo',
  ],
  plugins: [
    'react-native-reanimated/plugin',
  ],
}; 