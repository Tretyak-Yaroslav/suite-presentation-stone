const path = require('path');
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

let plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
        THREE: 'three',
    })
];

module.exports = {
    context: __dirname,
    entry: {
        main: path.resolve(__dirname, '../src/app/app'),
    },
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename: '[name].js'
    },
    watchOptions: {
        aggregateTimeout: 100,
        poll: true
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            three$: 'three/build/three.min.js',
            'three/.*$': 'three',
        }
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    }
                }
            })
        ]
    },

    module: {
        rules: [
            {test: /\.html$/, use: 'raw-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-runtime"],
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }
                ]
            },
            {test: /\.vue$/, use: 'vue-loader'},
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            }
        ],
    },
    plugins
};