/*eslint-env node*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const environment = process.env.NODE_ENV;

const config = {
    entry: './src/App.jsx',

    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

    devtool: process.env.WEBPACK_SERVE ? 'eval' : null,

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "/",
        filename: "bundle.js",
    },

    target: 'web',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['env', 'react'],
                    plugins: ['transform-decorators-legacy',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                    ]
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf)$/,
                loader: 'file-loader?name=[name].[ext]?[hash]'
            }, {
                test: /\.(html|woff|woff2)$/,
                loader: 'url-loader',
                exclude: /(node_modules|doc)/,
                options: {
                    limit: 10000
                }
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin(
            [{
                from: 'index.html',
                to: 'index.html'
            }]
        )
    ]

};

if (environment == "development") {
    config.serve = {
        content: [__dirname],
        port: 8888,
        add: (app, middleware, options) => {
            const historyOptions = {
                // ... see: https://github.com/bripkens/connect-history-api-fallback#options
            };

            app.use(convert(history(historyOptions)));
        }
    };
    config.mode = "development";
}

module.exports = config;