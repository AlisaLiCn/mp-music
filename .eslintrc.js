// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    // 不要分号
    semi: [2, 'never'],
    // 全部单引号
    quotes: [2, 'single'],
    // 可以使用 console
    'no-console': 0,
    // 允许使用匿名函数
    'func-names': 0,
    // 允许属性的 key 值加引号
    'quote-props': 0,
    // 允许对函数的参数赋值
    'no-param-reassign': 0,
    // 函数的参数可以不使用
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    // 不禁止箭头函数直接return对象
    'arrow-body-style': 0,
    // 允许short circuit evaluations
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'space-before-function-paren': 0,
    'no-fallthrough': [
      'error',
      {
        commentPattern: 'break[\\s\\w]*omitted',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    swan: true,
    tt: true,
    my: true,
    getApp: true,
    getPage: true,
    requirePlugin: true,
    mpvue: true,
    mpvuePlatform: true
  }
}
