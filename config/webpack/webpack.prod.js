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
    minimizer: [new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 10,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          booleans: true,
          collapse_vars: false,
          if_return: true,
          sequences: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true
        },
        mangle: {
          safari10: true,
        },
        output: {
          beautify: false,
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      parallel: true,
    })],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          filename: '[name].[contenthash].js',
          test: /[\\/]node_modules[\\/]/
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
