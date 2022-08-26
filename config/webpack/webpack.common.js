const webpack = require('webpack');
const path = require("path");

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const getEnvironment = require('./environments/getEnvironment.js');
const environment = getEnvironment();

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.tsx'],
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },
  resolve: {
    modules: ['node_modules', paths.src],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: paths.src,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          configFile: path.join(paths.root, '/babel.config.json'),
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        include: paths.src,
        exclude: /node_modules/,
      },
      // Images: Copy image files to build folder
      { test: /\.(png|jpe?g|gif|webp|ico)$/i, type: 'asset' },
      // Fonts: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf)$/, type: 'asset/inline' },
      // SVGs
      {
        test: /\.svg$/,
        type: 'asset',
        use: 'svgo-loader'
      },
    ],
  },
  // Customize the webpack build process
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`,
          to: paths.build
        },
      ],
    }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      inject: true,
      template: `${paths.public}/index.html`,
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({ ...environment }),
  ],
  optimization: {
    runtimeChunk: true,
  },
}
