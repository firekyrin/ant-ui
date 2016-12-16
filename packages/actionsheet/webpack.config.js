var webpack = require('webpack');
var path = require('path');
var config = require('../../build/config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'index.js')
    },
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'AntActionsheet'
    },
    plugins: [
        new ExtractTextPlugin(path.join(__dirname, 'style.css'))
    ],
    externals: config.externals
}
