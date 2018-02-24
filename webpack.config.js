/*eslint-env node*/

const path = require('path');

const config = {
    entry: [
        './main.js'
    ],

    output: {
        path: path.resolve(__dirname,'/build'),
        publicPath: '/',
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        port: 80,  
        historyApiFallback: true,
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['env', 'react'],
                plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
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
        }]
    }
};

module.exports = config;
