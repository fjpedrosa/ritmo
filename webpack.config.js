const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const PATHS = {
  entryPoint: path.resolve(__dirname, "src", "index.js"),
  bundles: path.resolve(__dirname, "dist"),
};

const libraryName = "Ritmo";

module.exports = {
  devtool: "source-map",
  entry: { [libraryName]: PATHS.entryPoint },
  mode: "development",
  output: {
    library: libraryName,
    libraryTarget: "umd",
    path: PATHS.bundles,
    filename: "[name].js",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ". tsx", ".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$|\.ts$/,
        loader: "ts-loader",
        options: {
          trnaspileOnly: true,
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: /src/,
      },
      {
        test: /\.(js|jsx)$/,
        use: "react-hot-loader/webpack",
        include: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "./index.html",
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public", "favicon.ico") },
        { from: path.resolve(__dirname, "public", "manifest.json") },
        { from: path.resolve(__dirname, "src", "Assets"), to: "Assets" },
      ],
    }),
  ],
  optimization: {
    runtimeChunk: "single",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    hot: true,
    hotOnly: true,
    liveReload: true,
    clientLogLevel: "silent",
  },
};
