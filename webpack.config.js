const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // 打包入口
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
        filename: 'bundle.js'
    }, 
    /**
     * 配置解析：配置别名、extensions 自动解析确定的扩展等等
     */
    resolve: {}, 
    /**
     * 开发服务器：run dev/start 的配置，如端口、proxy等
     */ 
    devServer: {
        port: 8088,
        open: true, // 自动打开浏览器
        compress: true // 服务器压缩
    }, 
    module: {
        rules: [{
                test: /\.(scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
                // use: [{
                //     loader: 'style-loader',
                // }, {
                //     loader: 'css-loader',
                // }, {
                //     loader: 'postcss-loader', 
                //     options: {
                //         plugins: function () { 
                //             return [
                //                 require('precss'),
                //                 require('autoprefixer')
                //             ];
                //         }
                //     }
                // }, {
                //     loader: 'sass-loader' // compiles SASS to CSS
                // }]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ], 
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: './src/login.html', // 配置要被编译的html文件
            hash: true,
            // 压缩 => production 模式使用
            minify: {
                removeAttributeQuotes: true, //删除双引号
                // collapseWhitespace: true //折叠 html 为一行
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