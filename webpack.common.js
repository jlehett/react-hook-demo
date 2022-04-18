require('dotenv').config();

const package = require('./package.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    target: 'web',
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
        }),
        // Define env vars
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
            'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
            'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
            'process.env.FUNCTIONS_API_BASE_URL': JSON.stringify(process.env.FUNCTIONS_API_BASE_URL),
            'process.env.VERSION': JSON.stringify(package.version),
        }),
    ],
    resolve: {
        symlinks: true,
        alias: {
            react: path.resolve('./node_modules/react'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@root': path.resolve(__dirname, 'src/root'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@stylesheets': path.resolve(__dirname, 'src/stylesheets'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@views': path.resolve(__dirname, 'src/views'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /robots\.txt/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[hash]-[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        },
                    },
                    'sass-loader',
                ],
                // Any *.styles.scss files will be modularized
                exclude: /\.styles\.scss$/,
            },
            {
                test: /\.styles\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]'
                            },
                        },
                    },
                    'sass-loader',
                ]
            }
        ]
    }
}