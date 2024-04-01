module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', '@react-native'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-native', 'prettier', '@typescript-eslint', 'unused-imports', 'simple-import-sort', 'import'],
  env: {
    'react-native/react-native': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'react-native/style-sheet-object-names': ['ScaledSheet'],
  },
  rules: {
    'react-native/no-unused-styles': 2,
    '@typescript-eslint/no-unused-vars': 'off', // or "no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 0,
    semi: ['warn', 'never'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: true,
        trailingComma: 'all',
        printWidth: 120,
      },
    ],
    'comma-dangle': 0,
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'off',
    'import/no-duplicates': 'error',
    'react/display-name': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-unused-styles': 'warn',
      },
    },
  ],
}
