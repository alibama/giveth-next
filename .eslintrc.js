// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     es6: true,
//   },
//   parserOptions: {
//     ecmaVersion: 8,
//     sourceType: "module",
//     allowImportExportEverywhere: true,
//   },
//   ignorePatterns: ["node_modules/*", ".next/*", ".out/*"],
//   extends: ["eslint:recommended", "plugin:prettier/recommended"],
//   overrides: [
//     {
//       files: ["**/*.js", "**/*.jsx"],
//       settings: { react: { version: "detect" } },
//       env: {
//         browser: true,
//         node: true,
//         es6: true,
//       },
//       extends: [
//         "eslint:recommended",
//         "plugin:react/recommended",
//         "plugin:react-hooks/recommended",
//         "plugin:jsx-a11y/recommended",
//       ],
//       rules: {
//         "react/prop-types": "off",
//         "react/react-in-jsx-scope": "off",
//         "jsx-a11y/anchor-is-valid": "off",
//         "prettier/prettier": ["error", {}, { usePrettierrc: true }],
//       },
//     },
//   ],
// };

module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        semi: false,
        printWidth: 100,
        endOfLine: 'auto',
        singleQuote: true,
        jsxSingleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'none'
      }
    ]
  },
  env: { es6: true }
}
