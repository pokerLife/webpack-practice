const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {},
    devServer: {
        port: 8088,
        open: true,
        compress: true
    },
    module: {
        rules: [{
            test: /\.(scss|less)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'less-loader']
            })
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './src/login.html', // 配置要被编译的html文件
            hash: true,
            minify: {
                removeAttributeQuotes: true, //删除双引号
                collapseWhitespace: true //折叠 html 为一行
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/index.css'), //提取单独的css
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ]
}