import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    { plugins: { jest: pluginJest } },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { rules: { "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }] } },
    { languageOptions: { globals: { ...globals.node, ...globals.jest } } },
    pluginPrettier,
];
