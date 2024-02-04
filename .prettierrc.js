/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  endOfLine: 'lf',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILT_IN_MODULES>',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/api/(.*)$',
    '^@/types/(.*)$',
    '^@/constant/(.*)$',
    '^@/utils/(.*)$',
    '^@/hooks/(.*)$',
    '^@/store/(.*)$',
    '^@/pages/(.*)$',
    '^@/components/base$',
    '^@/components/(.*)$',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.1.6'
}
