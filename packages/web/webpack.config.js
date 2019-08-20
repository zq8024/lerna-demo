
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge');
const base = require('../base.config');

module.exports = function (env, argv) {
    const baseCfg = base.baseCfgFun(env, argv);
    const cfg = merge({}, baseCfg, {
        entry: {
            "agp.web": './src/index.ts'
        },

        output: {
            library: '@agp/web',
        },

        externals: {
            
        },

        plugins: [
            new CleanWebpackPlugin([base.outputPath + 'agp.web.js']),
        ]
    })

    //console.log(cfg);
    return cfg;

}