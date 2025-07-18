import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ✅ Regras padrão do Next.js com TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Integração com Prettier (Flat Config)
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          printWidth: 80,
          tabWidth: 2,
          trailingComma: "es5",
          endOfLine: "auto",
          singleAttributePerLine: true,
        },
      ],
    },
  },
];
