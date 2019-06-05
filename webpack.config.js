let path = require('path')

module.exports = {
  context: path.join(__dirname, '/src/'),
  entry: './index.js',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
            'babel-plugin-styled-components'
          ]
        }
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(jpg|png)$/,
      use: 'url-loader'
    }]
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'bundle.min.js'
  }
}
