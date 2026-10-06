import {defineConfig} from "oxlint";

export default defineConfig({
  categories: {
    correctness: "warn"
  },
  rule: {
    "eslint/no-unused-vars": "error"
  },
  options: {
    typeAware: true,
    typeCheck: true,
    maxWarnings: 10
  }
})