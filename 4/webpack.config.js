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

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', // добавлено: имя выходного файла
        clean: true, // очищать dist перед сборкой
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000, // опционально
        hot: true,  // горячая перезагрузка
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
                exclude: /node_modules/, // добавить исключение
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // важно для импортов без расширений
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.devtool = 'source-map'; // опционально для прод
    } else {
        config.mode = 'development';
        config.devtool = 'inline-source-map'; // удобно для отладки
    }
    return config;
};
