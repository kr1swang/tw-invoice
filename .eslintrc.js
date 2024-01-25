module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  plugins: ["tailwindcss"],
  rules: {
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "always", children: "always", propElementValues: "always" },
    ],
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error",
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.js",
    },
  },
  overrides: [
    { files: ["*.ts", "*.tsx"], parser: "@typescript-eslint/parser" },
  ],
};
