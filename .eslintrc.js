const path = require('path');
module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve('./src')],
      },
    },
  },
  env: {
    browser: true,
  },
  rules: {
    'no-console': 'off',
  },
};
