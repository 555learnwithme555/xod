module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: [
    'react',
    'import',
  ],

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/react',
    'plugin:react/recommended',
    'airbnb',
  ],

  globals: {
    describe: true,
    it: true,
    before: true,
    beforeEach: true,
    after: true,
    afterEach: true,
  },

  rules: {
    'no-plusplus': 'off',
    'no-underscore-dangle': ['error', {
      allow: ["__"], /* Ramda’s R.__ */
      allowAfterThis: true,
      allowAfterSuper: true
    }],

    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.spec.js', '**/xod-client-electron/**/*.js'] 
    }],

    'arrow-parens': 'off', // TODO: enable and fix code
    'no-prototype-builtins': 'off', // TODO: enable and fix code
    'no-undef': 'off', // TODO: enable and fix code
    'import/imports-first': 'off', // TODO: enable and fix code
    'import/prefer-default-export': 'off', // TODO: enable and fix code
    'import/no-dynamic-require': 'off', // TODO: enable and fix code
  },
};
