import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Section 1: Ignore files and directories.
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },

  // Section 2: Base configuration for all files.
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },

  // Section 3: TypeScript specific rules.
  ...tseslint.configs.recommended,

  // Section 4: Prettier and Import Sorting Integration.
  eslintConfigPrettier,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
          bracketSpacing: true,
          tabWidth: 2,
          trailingComma: "all",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "capitalized-comments": ["error", "always"],
    },
  },
);
