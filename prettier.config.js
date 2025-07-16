/** @type {import("prettier").Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-organize-imports"],
  tailwindConfig: "./tailwind.config.js",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: "es5",
  endOfLine: "auto",
};
