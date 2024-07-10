module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json', // Укажите путь к вашему tsconfig.json
    tsconfigRootDir: __dirname, // Укажите корневую директорию вашего проекта
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-compiler', 'import', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    'react-compiler/react-compiler': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
