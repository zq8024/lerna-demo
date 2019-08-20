
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


/*** env arg:  
 * prod  
 * preview  
 * platform: web mobile[ android ios wechat ]
 * appid
 */
const outputPath = path.join(__dirname, 'h5/dist/assets/js/');
module.exports.outputPath = outputPath;
module.exports.baseCfgFun = function (env, argv) {
    if (env.platform == 'android' || env.platform == 'ios' || env.platform == 'wechat') env.mobile = true;
    env.appid = env.appid || 'flowtest2018';

    return merge({}, {
        mode: env.prod ? 'production' : 'development',
        devtool: env.prod ? 'source-map' : 'source-map',

        output: {
            path: outputPath,
            filename: '[name].js?[hash]',
            publicPath: 'assets/js/',
            libraryTarget: "umd",
        },


        optimization: {
            minimize: false,
            /*namedChunks: true,
            namedModules: true,
            runtimeChunk: {
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
            //$: 'jquery',
            'jquery': 'jQuery',
            '@agp/core': !(env.preview || false),
            '@agp/web': !(env.preview || false),
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

            new webpack.ProvidePlugin({
                tslib: 'tslib'
            }),

        ]
    })

}
