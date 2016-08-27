var webpack = require('webpack');
var htmlWebpack = require('html-webpack-plugin');

module.exports = {
    entry: "./scripts/main.ts",
    output: {
        path: "../../build/client/scripts",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new htmlWebpack({
            template: './views/index.html',
            filename: '../views/index.html'
        })
    ]
};