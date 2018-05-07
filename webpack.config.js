/*eslint-env node*/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const convert = require('koa-connect');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const history = require('connect-history-api-fallback');
const environment = process.env.NODE_ENV;

const config = {
    entry: {
        app: './src/App.jsx',
        vendor: ['semantic-ui-react','moment']
    },

    mode: environment,

    devtool: (environment == 'development') ? 'eval' : 'source-map',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[hash].js",
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf)$/,
                exclude: /node_modules/,
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
        ),
        new BundleAnalyzerPlugin({
            analyzerPort: 8882,
            analyzerMode: 'server'
        })
    ]
};

if (environment == 'development') {
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
}

module.exports = config;