module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['react', 'unused-imports', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // or "no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 110,
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: 'none',
        tabWidth: 2,
        useTabs: false,
        semi: false
      }
    ],
    semi: 'off',
    'comma-dangle': ['warn', 'never'],
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off'
  }
}
