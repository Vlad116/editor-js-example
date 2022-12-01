const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development" || false;
const mode = isDev ? "development" : "production";

module.exports = {
  mode,
  entry: "./article-editor/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../../build-article"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/env", { targets: { ie: "11" }, modules: false }],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-transform-modules-commonjs",
              "@babel/plugin-proposal-nullish-coalescing-operator",
            ],
          },
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: "[folder]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: '@import "~@/common/mixins/index";',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    extensions: [".js", ".json", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
