const CracoLessPlugin = require("craco-less");
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": "./src",
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  babel: {
    plugins: [
      "@babel/plugin-proposal-optional-chaining", // Optional chaining support
      "@babel/plugin-proposal-nullish-coalescing-operator", // Nullish coalescing support
    ],
  },

  webpack: {
    configure: (webpackConfig) => {
      const babelLoader = webpackConfig.module.rules
        .find((rule) => rule.oneOf !== undefined)
        .oneOf.find(
          (rule) => rule.loader && rule.loader.includes("babel-loader")
        );

      // Ensure Babel transpiles node_modules if needed (like optional chaining)
      babelLoader.exclude = /node_modules\/(?!some-esm-package)/;

      return webpackConfig;
    },
  },

  jest: {
    moduleNameMapper: {
      "^@/(.+)": "<rootDir>/src/$1",
    },
  },
};
