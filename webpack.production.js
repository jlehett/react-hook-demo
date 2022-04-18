require('dotenv').config();

const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    entry: [
        path.join(__dirname, '/src/index.js'),
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});