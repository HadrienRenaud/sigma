/*eslint-env node*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [
        './src/App.jsx'
    ],

    output: {
        path: path.join(__dirname,'build'),
        publicPath: "", // '/'
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 80,  
        historyApiFallback: true,
    },

    module: {
        // These options determine how the different types of modules within a project will be treated.
        // https://webpack.js.org/configuration/module/
        loaders: [
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
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },

    /*
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Projet Sigma',
            inject: 'head',
            favicon: 'favicon.ico'
        })
    ]
    */
   
};

module.exports = config;
