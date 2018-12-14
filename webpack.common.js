const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}


module.exports = {
    entry: {
        app: './src/index.js',
    // vendors: './src/vendors'  // 分离第三方依赖
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        modules: [ // 优化模块查找路径
            resolve('src'),
            resolve('node_modules') // 指定node_modules所在位置 当你import第三方模块式 直接从这个路径下搜寻
        ],
        extensions: ['.js', '.ts', 'tsx']
    },
    module: {
        rules: [{
            test: /\.(scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader?name=[name].[ext]&outputPath=fonts/'
            }]
        },
        {
            test: /\.m?js$/,
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader?cacheDirectory'
            }, // 缓存loader执行结果
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    //name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }, ]
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                experimentalWatchApi: true,
            }
        }, { //处理html内联图片
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }],
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
                collapseWhitespace: true //折叠 html 为一行
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('css/index.css'), //提取单独的css
    ]
};
