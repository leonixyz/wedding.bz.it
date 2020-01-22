const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(css)|(html)$/i,
        use: 'raw-loader',
      },
    ]
  },
  devServer: {
    publicPath: "/",
    contentBase: "./dist",
    hot: true
  }
};
