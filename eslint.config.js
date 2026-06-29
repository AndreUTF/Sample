const playwright = require('eslint-plugin-playwright')

module.exports = [
  {
    files: ['playwright/**/*.js'],
    plugins: { playwright },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs'
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules
    }
  }
]
