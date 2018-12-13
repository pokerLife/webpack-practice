const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        port: 8088,
        open: true, // 自动打开浏览器
        compress: true, // 服务器压缩
        contentBase: path.join(__dirname, 'dist'),
    },
});