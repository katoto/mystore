/**
 * Created by lichun on 2017/1/18.
 */
const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = Object.assign({}, base, {
    // devtool: '#cheap-source-map',
    // devtool: '#hidden-source-map',
    plugins: base.plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin({
            // filename: 'style.[chunkhash:8].css',
            filename: 'style.[hash:8].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            // filename: '[name].[chunkhash:8].js'
            filename: '[name].[chunkhash:8].js'

        })
        // new WebpackAssetsManifest({})

    ]),
    output: {
        // filename: '[name].[chunkhash:8].js',
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        chunkFilename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            ...base.module.rules,
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: 'css-loader'
                        })
                    },
                    extractCSS: true,
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ]
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })

            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    // name: '[path][name].[hash:8].[ext]'
                    name: '[path][name].[hash:8].[ext]'
                }

            }
        ]
    }

})
