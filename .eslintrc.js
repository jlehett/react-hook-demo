module.exports = {
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        'requireConfigFile': false,
        'babelOptions': {
            'presets': ['@babel/preset-react']
        }
    },
    'plugins': ['@babel'],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'extends': 'airbnb',
    'globals': {
        'Promise': true,
    },
    'rules': {
        // ---
        // General JS Rules
        // ---

        'indent': ['warn', 4, { 'SwitchCase': 1 }],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-tag-spacing': ['off'],
        'react/destructuring-assignment': ['off'],
        'prefer-arrow-callback': ['off'],
        'space-before-function-paren': ['off'],
        'semi': ['off'],
        'global-require': ['off'],
        'prefer-template': ['off'],
        'no-bitwise': ['off'],
        'no-console': ['on'],
        'no-unused-vars': ['on'],
        'no-alert': ['on'],
        'quote-props': ['off'],
        'no-use-before-define': ['on'],
        'quotes': ['warn', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true,
        }],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'acc',
            ],
        }],
        'padded-blocks': 'off',
        'arrow-body-style': 'off',
        'max-len': 'off',
        'prefer-destructuring': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'import/first': 'on',
        'no-return-await': 'off',
        'no-return-assign': 'off',
        'camelCase': 'on',
        'consistent-return': 'off',
        'no-underscore-dangle': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-restricted-syntax': 'on',
        'no-prototype-builtins': 'on',
        'no-multi-spaces': 'off',
        'spaced-comment': 'on',
        'no-else-return': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'no-nested-ternary': 'off',
        'import/extensions': ['error', 'always', {
            js: 'never',
        }],
        'import/prefer-default-export': 'off',
        'import/resolver': {
            'webpack': {
                'config': 'webpack.common.js',
            },
        },
        'jsx-a11y/anchor-is-valid': ['error', {
            'components': ['Link'],
            'specialLink': ['to'],
            'aspects': ['noHref', 'invalidHref', 'preferButton'],
        }],
        'jsx-a11y/click-events-have-key-events': 'on',
        'jsx-a11y/no-static-element-interactions': 'on',
        'jsx-a11y/no-noninteractive-element-interactions': 'on',
        'react/no-unused-state': 'on',
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': ['off'],
        'react/prop-types': ['on'],
        'react/prefer-stateless-function': 'off',
        'react/require-default-props': 'off',
        'react/default-props-match-prop-types': 'on',
        'react/no-unused-prop-types': 'on',
        'react/no-array-index-key': 'on',
        'react/no-unescaped-entities': 'on',
        'react/jsx-curly-brace-presence': 'on',
        'react/sort-comp': 'on',
        'react/jsx-no-bind': 'on',
        'react/jsx-one-expression-per-line': 'warn',
        'react/jsx-uses-react': 'on',
        'react/react-in-jsx-scope': 'on',
        'react/jsx-props-no-spreading': ['error', {
            'custom': 'ignore',
        }],
    },
}