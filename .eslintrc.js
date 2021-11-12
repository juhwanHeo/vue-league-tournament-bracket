module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:vue/recommended", "prettier"],
    "parserOptions": {
        "sourceType": "module"
    },
    plugins: ["vue", "mocha"],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "no-extra-boolean-cast": "off",
        "max-params": ["error", 4],
        "max-statements": ["error", 30],
        "max-depth": ["error", 3],
        complexity: ["error", 10],
        curly: ["error", "all"],
        "prefer-const": "error",
        eqeqeq: "error",
        "require-yield": "error",
        "no-caller": "error",
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-eq-null": "error",
        "no-multi-str": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-sync": "warn",
        "no-iterator": "error",
        "no-proto": "error",
        "no-script-url": "error",
        "no-new-func": "error",
        "newline-per-chained-call": "off",
        "no-new-object": "error",
        "no-self-compare": "error",
        "vue/v-on-style": ["error", "shorthand"],
        "vue/v-bind-style": ["error", "shorthand"],
        "vue/name-property-casing": ["error", "kebab-case"],
        "vue/html-quotes": ["error", "double"],
        "vue/max-attributes-per-line": [
            "error",
            {
                singleline: 4,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        "vue/no-multi-spaces": "error",
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/attribute-hyphenation": ["error", "always"],
        "vue/this-in-template": ["error", "never"],
        "vue/no-side-effects-in-computed-properties": "error",
        "vue/no-duplicate-attributes": "error",
        "vue/return-in-computed-property": "error",
        "vue/no-template-key": "error",
        "vue/no-dupe-keys": "error",
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/prop-name-casing": "error",
        "vue/require-prop-types": "off",
        "vue/order-in-components": "error",
        "vue/attributes-order": "off",
        "mocha/no-exclusive-tests": "error",
        "vue/singleline-html-element-content-newline": "off",
        "vue/html-closing-bracket-spacing": "off",
        "vue/component-name-in-template-casing": ["error", "kebab-case"],
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/no-v-html": "off"
    }
};
