module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },

  settings: { react: { version: "18.2" } },
  plugins: ["react", "react-hooks", "react-refresh"],
  rules: {
    //React
    "react-refresh/only-export-components": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "react/display-name": 0,

    //MUI
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],

    //General
    "no-undef": 1,
    "no-console": 0,
    "no-lonely-if": 1,
    "no-unused-vars": 1,
    "no-trailing-spaces": 1,
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": 1,
    "object-curly-spacing": [1, "always"],
    semi: [1, "never"],
    "array-bracket-spacing": 1,
    "linebreak-style": 0,
    "no-unexpected-multiline": "warn",
    "comma-dangle": 1,
    "comma-spacing": 1,
    "arrow-spacing": 1
  },
};
