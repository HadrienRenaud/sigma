/*eslint-env node*/

const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: [
        './src/App.jsx'
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build'),
    },

    target: 'web',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },{
                test: /\.html$/,
                loader: 'file-loader',
                exclude: /(node_modules|doc)/
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

module.exports = config;
