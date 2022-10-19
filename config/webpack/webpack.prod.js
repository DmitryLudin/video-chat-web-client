const { merge } = require('webpack-merge');

const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const common = require('./webpack.common.js');
const path = require("path");
const paths = require("./paths");

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: path.join(paths.root, '/tsconfig.json'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          filename: '[name].[contenthash:8].js',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
          // test: /[\\/]node_modules[\\/](react|react-dom|axios|reflect-metadata|validator)[\\/]/,
        }
      }
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }
})
