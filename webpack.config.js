const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const jsRoot = './src/scripts';

// const alpineJsPath = path.resolve(__dirname, 'node_modules/alpinejs/dist/alpine.js');
const mainJsPath = path.resolve(__dirname, jsRoot, 'main.js');

const webpackConfig = {
  mode: process.env.NODE_ENV || 'development',
  // entry: entries,
  entry: {
    styles: path.resolve(__dirname, './src/styles/main.css'),
    scripts: mainJsPath,
  },
  output: {
    path: path.resolve(__dirname, '_site/assets'),
    filename: 'scripts/[name].js',
    publicPath: '/',
  },
  // output: {
  //   path: path.resolve(__dirname, '_site/assets'),
  //   publicPath: '/',
  // },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, '_site') },
        {
          from: path.resolve(__dirname, 'node_modules/alpinejs/dist/alpine.js'),
          to: path.resolve(__dirname, '_site/assets/scripts/alpine.js'),
        },
      ],
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
    new RemoveEmptyScriptsPlugin({
      extensions: ['less', 'scss', 'css', 'styl', 'sass', 'png', 'gif', 'jpg', 'jpeg'], // Empty js should also not be generated with image
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};

// optimizer
if (isProduction) {
  webpackConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ],
  };
}

module.exports = webpackConfig;
