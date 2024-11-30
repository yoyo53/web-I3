import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {plugins: {jest: pluginJest}},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {rules: {"no-unused-vars": "warn"}},
  {languageOptions: { globals: { ...globals.node, ...globals.jest }}},
];