module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  plugins: ['import', 'prettier'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
  },
};
