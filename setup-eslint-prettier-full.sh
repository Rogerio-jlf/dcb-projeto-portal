#!/bin/bash

echo "🚀 Configurando ESLint + Prettier FULL (Next.js, Tailwind, TypeScript, unused imports)..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
pnpm add -D eslint prettier eslint-config-next \
  eslint-config-prettier eslint-plugin-prettier \
  prettier-plugin-tailwindcss prettier-plugin-organize-imports \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-plugin-unused-imports

# 2. Criar .eslintrc.json
echo "📝 Criando .eslintrc.json..."
cat <<EOF > .eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier", "unused-imports"],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": false,
        "printWidth": 100,
        "trailingComma": "es5",
        "plugins": [
          "prettier-plugin-tailwindcss",
          "prettier-plugin-organize-imports"
        ]
      }
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "react-hooks/exhaustive-deps": "warn"
  }
}
EOF

# 3. Criar prettier.config.js (corrigido para evitar erro ESM)
echo "📝 Criando prettier.config.js..."
cat <<EOF > prettier.config.js
/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports"
  ],
  tailwindConfig: "./tailwind.config.js",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: "es5",
  endOfLine: "auto"
};
EOF

# 4. Atualizar package.json com scripts
echo "📝 Atualizando scripts no package.json..."
pnpm pkg set scripts.lint="next lint"
pnpm pkg set scripts.lint:fix="eslint . --fix"
pnpm pkg set scripts.format="prettier --write ."

# 5. Criar .vscode/settings.json
echo "📝 Criando configuração do VS Code (.vscode/settings.json)..."
mkdir -p .vscode
cat <<EOF > .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
EOF

echo "✅ Configuração FULL concluída!"
echo "👉 Use: pnpm run lint, pnpm run lint:fix e pnpm run format"

#==================== Para rodar ====================#
# chmod +x setup-eslint-prettier-full.sh
# ./setup-eslint-prettier-full.sh
