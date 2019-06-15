/*eslint-env node*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const environment = process.env.NODE_ENV || 'development';

const config = {
    
    entry: './src/App.jsx',

    mode: environment,

    devtool: (environment == 'development') ? 'eval' : 'source-map',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "/"
    },

    target: 'web',

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },

    resolve: {
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
        ]
    },

    module: {
        rules: [
            {
                "enforce": "pre",
                "test": /\.(js|jsx)$/,
                "exclude": /node_modules/,
                "use": "eslint-loader"
            }
            ,{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
            ,{
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
            ,{
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8882,
            analyzerMode: (environment == 'development') ? 'disabled' : 'statix'
        })
    ]
};


if (environment == 'development') {

    const convert = require('koa-connect');
    const history = require('connect-history-api-fallback');

    config.serve = {
        content: [__dirname],
        port: 8080,
        add: (app, middleware, options) => {
            const historyOptions = {
                // ... see: https://github.com/bripkens/connect-history-api-fallback#options
            };

            app.use(convert(history(historyOptions)));
        }
    };
}

module.exports = config;
