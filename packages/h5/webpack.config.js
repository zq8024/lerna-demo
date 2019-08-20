
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');

const base = require('../base.config');

module.exports = function (env, argv) {
    const baseCfg = base.baseCfgFun(env, argv);

    const cfg = merge({}, baseCfg, {
        entry: {
            "agp.h5": './src/index.ts'
        },

        output: {
            library: '@agp/h5',
        },

        externals: {
            
        },

        plugins: [
            new CleanWebpackPlugin([base.outputPath + 'agp.h5.js']),

            new HtmlWebpackPlugin({
                title: 'demo',
                filename: '../../index.html',
                template: './index.html',
                templateParameters: {
                    timetick: new Date().valueOf(),
                    appid: env.appid,
                    min: env.prod ? '.min' : '',
                    prod: env.prod
                },
                alwaysWriteToDisk: true,
                excludeChunks: ['debuger']
            }),

            new HtmlWebpackHarddiskPlugin(),
        ],

        devServer: {
            contentBase: 'dist',
            port: 9001,
            host: 'localhost',
            proxy: [{
                context: ["/api", "/cfg", "/assets/css/fetchtheme"],
                target: "http://localhost:8099",
            },
                /* {
                    context: ["/"],
                    target: "http://localhost:8099",
                    bypass: function (req, res, proxyOptions) {
                        var url = req.url;
                        if (!(url == "/" || url.startsWith("/?"))) {
                            //console.log('skip proxy: ' + url);
                            return url;
                        }
                        //console.log('proxy url: ' + url);
                    }
                } */

            ]
        },

        optimization: {
            splitChunks: {
                // include all types of chunks
                minSize: 1,
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }

    })
    //console.log(cfg);
    return cfg;
}
