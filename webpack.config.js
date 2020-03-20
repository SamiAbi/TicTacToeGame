
module.exports = {
    // 1
    entry: './src/index.js',
    // 2
    output: {
      path: __dirname + '/dist',
      publicPath: '/TicTacToeGame/',
      filename: 'bundle.js'
    },
    // 3
    devServer: {
      contentBase: './dist'
    }
  };