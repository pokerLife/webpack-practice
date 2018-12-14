const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');


//修改webpack.base.conf.js代码
// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/templates/${name}/index.html`,
        filename: `${name}.html`,
        // favicon: './favicon.ico',
        // title: title,
        inject: true,
        hash: true, //开启hash  ?[hash]
        chunks: chunks, //页面要引入的包
        minify: {
            // removeComments: true, //移除HTML中的注释
            // collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            // removeAttributeQuotes: true, //去除属性引用
        },
    };
};

const htmlArray = [{
        _html: 'index',
        title: '登录',
        chunks: ['vendor', 'index'] //页面用到的vendor模块
    },
    {
        _html: 'table',
        title: '表格',
        chunks: ['vendor', 'table']
    },
];

module.exports = {
    entry: {
        index: './src/index.js',
        table: './src/js/table.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
        filename: '[name].bundle.js'
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
                test: /\.(less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(woff2?|svg)$/,
                use: [{
                    loader: 'url-loader?limit=10000&name=[name].[ext]&outputPath=fonts/'
                }]
            },
            {
                test: /\.(ttf|eot)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]&outputPath=fonts/'
                }]
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
        // new HtmlWebpackPlugin({
        //     filename: 'index.html', // 配置输出文件名和路径
        //     template: './src/login.html', // 配置要被编译的html文件
        //     hash: true,
        //     // 压缩 => production 模式使用
        //     minify: {
        //         removeAttributeQuotes: true, //删除双引号
        //         // collapseWhitespace: true //折叠 html 为一行
        //     }
        // }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/index.css'), //提取单独的css
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    // test: /\.js$/,
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
                    name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
                    enforce: true,
                }
            }
        }
    }
}

//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})