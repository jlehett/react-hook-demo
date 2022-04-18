const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    entry: [
        path.join(__dirname, '/src/index.js'),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        open: true,
        hot: true,
    },
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    }
});