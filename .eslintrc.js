module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    'no-plusplus': 0,
    'no-await-in-loop': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
  },
}
