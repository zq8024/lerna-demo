
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge');
const base = require('../base.config');

module.exports = function (env, argv) {
    const baseCfg = base.baseCfgFun(env, argv);
    const cfg = merge({}, baseCfg, {
        entry: {
            "agp.core": './src/index.ts'
        },

        output: {
            library: '@agp/core',
        },

        plugins: [
            new CleanWebpackPlugin([base.outputPath + 'agp.core.js'])
        ]
    })
    //console.log(cfg);
    return cfg;
}
