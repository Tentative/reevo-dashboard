const path = require("path");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
  entry: {
    // Your entry points
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
  },
  module: {
    // Your loader rules go here.
  },
  plugins: [
    new WebpackAssetsManifest({
      // Options go here
    }),
  ],
};
