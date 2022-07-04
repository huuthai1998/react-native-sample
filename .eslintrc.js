module.exports = {
  root: true,
  extends: "eslint-config-airbnb",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: ["error", "double"],
    "object-curly-newline": "off",
    "arrow-body-style": 1,
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["state"] },
    ],
  },
  ignorePatterns: ["coverage"],
};
