import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.{js,mjs,cjs,vue}"]},
  {ignores: ["**/dist/**"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "module"}},
  {rules: {"no-unused-vars": "warn"}},
  {languageOptions: { globals: { ...globals.browser, ...globals.node }}},
  pluginPrettier,
];

