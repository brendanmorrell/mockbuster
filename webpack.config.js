const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // { test: /.node$/, loader: 'node-loader' },
    ],
  },
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   dns: 'empty',
  //   module: 'empty',
  // },
  devServer: {
    contentBase: path.join(__dirname, 'public/dist'),
    historyApiFallback: true,
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom template',
      template: 'template.html',
    }),
  ],
};
