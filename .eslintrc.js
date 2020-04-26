// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    'describe': true,
    'it': true,
    'expect': true
  },
  // add your custom rules here
  rules: {
    'generator-star-spacing': 0,
    'template-curly-spacing': 0,
    'arrow-parens': 0,
    'vue/no-v-html': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    indent: 0
  }
}

