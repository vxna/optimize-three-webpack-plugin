const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const OptimizeThreePlugin = require('../src')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(ktx2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: 'three.js webgl - KTX2 texture loader',
        head: { raw: '<style>body{margin:0}</style>' },
        trimWhitespace: true,
      },
      template: require('@vxna/mini-html-webpack-template'),
    }),
    new OptimizeThreePlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/three/examples/js/libs/basis',
          to: 'libs/basis',
        },
      ],
    }),
  ],
}
