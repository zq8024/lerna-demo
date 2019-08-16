
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

/*** env arg:  
 * prod  
 * preview  
 * platform: web mobile[ android ios wechat ]
 * appid
 */

module.exports = [function (env, argv) {
    if (env.platform == 'android' || env.platform == 'ios' || env.platform == 'wechat') env.mobile = true;
    env.appid = env.appid || 'flowtest2018';
    return {
        mode: env.prod ? 'production' : 'development',
        devtool: env.prod ? 'source-map' : 'source-map',
        entry: {
            "main": './src/index.ts'
        },

        output: {
            path: path.join(__dirname, 'dist/assets/js'),
            filename: '[name].js?[hash]',
            publicPath: 'assets/js/',
            library: 'a2',
            libraryTarget: "umd"
        },

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
            minimize: false,
            /*namedChunks: true,
            namedModules: true */

            splitChunks: {
                // include all types of chunks
                minSize: 1,
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    core: {
                        test: /\@agp\/core/,
                        name: 'agp.core',
                        chunks: 'all'
                    }

                }
            }
        },

        resolve: {
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
            alias: {
                'tslib$': 'tslib/tslib.es6.js'
            }
        },
        externals: {
            jquery: 'jQuery',
            $: 'jQuery'
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

            new HtmlWebpackPlugin({
                title: 'demo',
                filename: '../../index.html',
                template: './index.html',
                templateParameters: {
                    timetick: new Date().valueOf(),
                    appid: env.appid,
                    min: env.prod ? '.min' : ''
                },
                alwaysWriteToDisk: true,
                excludeChunks: ['debuger']
            }),

            new HtmlWebpackHarddiskPlugin(),
        ]
    }
}
]