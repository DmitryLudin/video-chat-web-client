const { merge } = require('webpack-merge');

const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  plugins: [
    new StatoscopeWebpackPlugin()
  ]
})
