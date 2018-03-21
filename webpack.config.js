/*eslint-env node*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/App.jsx',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
    },

    mode: 'development',

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
                test: /\.(html|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
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

module.exports = config;
