const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        publicPath: '', // 资源发布地址替换成线上绝对路径
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new BundleAnalyzerPlugin(),
        new OptimizeCSSPlugin({ // 压缩css
            cssProcessorOptions: {
                safe: true
            }
        }),
    ]
});
