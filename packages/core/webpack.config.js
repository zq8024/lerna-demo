
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');


/*** env arg:  
 * prod  
 * preview  
 * platform: web mobile[ android ios wechat ]
 * appid
 */



module.exports = function (env, argv) {
    if (env.platform == 'android' || env.platform == 'ios' || env.platform == 'wechat') env.mobile = true;
    env.appid = env.appid || 'flowtest2018';

    return merge({}, {
        mode: env.prod ? 'production' : 'development',
        devtool: env.prod ? 'source-map' : 'source-map',
        entry: {
            "agp.core": './src/index.ts'
        },

        output: {
            path: path.join(__dirname, '../h5/dist/assets/lib'),
            filename: '[name].js?[hash]',
            publicPath: 'assets/js/',
            library: '@agp/core',
            libraryTarget: "umd",

        },


        optimization: {
            minimize: false,
            /*namedChunks: true,
            namedModules: true */
            /* runtimeChunk: {
                name: 'runtime'
            }, */
        },

        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
            /* alias: {
                'tslib$': 'tslib/tslib.es6.js'
            } */
        },
        externals: {

        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.prod': JSON.stringify(env.prod || false),
                'process.env.preview': JSON.stringify(env.preview || false),
                'process.env.platform': JSON.stringify(env.platform || 'web')
            }),

            new CleanWebpackPlugin(['dist/assets/js']),

            new webpack.ProvidePlugin({
                tslib: 'tslib'
            }),

        ]
    })

}
