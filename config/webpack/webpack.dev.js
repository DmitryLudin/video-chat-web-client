const { merge } = require('webpack-merge');
const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const common = require('./webpack.common.js');
const paths = require("./paths");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        include: paths.src,
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: path.join(paths.root, '/tsconfig.json'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    client: {
      overlay: true,
    },
    static: {
      directory: paths.public
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
        changeOrigin: true,
      },
    },
  }
})
