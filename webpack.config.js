// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isGitHubPages = process.env.NODE_ENV === 'production';
const repoName = 'acediscountcodes.github.io'; 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: isGitHubPages ? `/${repoName}/` : '/', // Important for dev server
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // JS and JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Tailwind
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Images
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow imports without extension
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use your template
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/manifest.json', to: 'manifest.json' },
        { from: 'public/favicon.ico', to: 'favicon.ico' },
        { from: 'public/logo192.png', to: 'logo192.png' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
};
