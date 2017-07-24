const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app/app.module.js',
    vendor: ['angular', 'angular-ui-router'],
  },
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-0'] },
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ]
      },
      {
        test: /\.html$/,
        use: [
	        'html-loader'
        ]
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'), 
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
  devServer: {
    contentBase: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './static')
    ],
    watchContentBase: true
  },
  devtool: 'inline-source-map'
};
