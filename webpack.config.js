const path = require("path");
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const htmlWebPackPlugin = require ('html-webpack-plugin');

const output = {
    entry: {
        server:'./server.js',
    },
    output: {},
    target: 'node',
    node: {},
    externals: [],
    module: {},
    plugins: [],
};

module.exports = output;




