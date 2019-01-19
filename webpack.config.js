/*eslint-env node*/
//tell eslint that this file is used in a nodejs environment,
// contrary to src files which are transpiled by babel-loader before run.

require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const regeneratorRuntime = require("regenerator-runtime");

const config = {
    entry: './src/App.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        //publicPath: "/"
    },

    target: 'web',
    // allows using __dirname with the correct semantic (otherwise __dirname will return '/' regardless of file)
    node: { __dirname: true },

    /*
    // do not bundle node_modules, nor secret config files
    externals: [
        nodeExternals(),
        //nodeExternals({ whitelist: ['modules-to-bundle'] }),
        //{
        //      customSecretFile: './custom_secret_file.json',
        //}
    ],
    */

    module: {    
        // an array of JSONs, one for each rule
        rules: [
            /*{
                // rule conditions
                test: /\.js$/, // files which this rule applies to (syntax : /myregex/)
                exclude: /node_modules/, // exclude all inputs whose absolute path matches /node_modules/

                // rule results
                use: {
                    loader: "babel-loader" // specify transformations to be applied on the source code
                }
            },*/
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,

                use: {
                    loader: "babel-loader"
                    // options for babel-loader are provided in a separate file: .babelrc
                },
            }, {
                test: /\.ts$/,
                use: ['ts-loader'],
            }, {
                test: /\.graphql?$/,
                use: [{
                    loader: 'webpack-graphql-loader',
                    options: {
                        // validate: true,
                        // schema: "./path/to/schema.json",
                        // removeUnusedFragments: true
                        // etc. See "Loader Options" below
                    }
                }]
            }, {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg|ico)$/,
                use: {
                    loader: 'url-loader?limit=8192'
                    // loads files as base64 encoded URL if filesize is < limit
                    // default fallback: file-loader
                }
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html", // writes file to root directory of the project
            favicon: "./assets/favicon.ico"
        })
    ],

    //options for webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: false,
        port: 8888,
        historyApiFallback: true, //redirects all GETs to / so that routing is made by react (not the server)
        // inline: true
        // default. Inline mode = a script will be inserted in your bundle to take care of live reloading,
        // and build messages will appear in the browser console.
    }
};

module.exports = env => {
    if (env && env.GRAPHQL_MOCK) {
        console.log("Mocking GraphQL schema.");

        config.plugins.push(new webpack.NormalModuleReplacementPlugin(
            /graphql\/http-link\.js/,
            './graphql/schema-link.js'
        ));
    }

    return config;
};
