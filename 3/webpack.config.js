const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { setMaxListeners } = require('events');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),

    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    clean: true, // очищает dist перед каждой сборкой
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // позволяем импортировать без указания расширений
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true, // горячая перезагрузка модулей
    historyApiFallback: true, // для React Router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), // абсолютный путь к шаблону
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource', // лучше asset/resource для явного копирования
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // добавили обработку CSS
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // оптимизация для бандлов
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.devtool = 'source-map'; // полезно для отладки в production
    config.optimization.minimize = true;
  } else {
    config.mode = 'development';
    config.devtool = 'eval-source-map';
  }
  return config;
};
