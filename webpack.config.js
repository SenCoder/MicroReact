// var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  // devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/index.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          // plugins: ['react-html-attrs'], //添加组件的插件配置
        }
      },
      // css loader 配置
      // {
      //   test: /\.css?$/,
      //   loader:'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
      // }
      //下面是使用 ant-design 的配置文件
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/js/bundle.js"
  }
};