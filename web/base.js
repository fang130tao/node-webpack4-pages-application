const path = require('path')
const webpack = require('webpack') //访问内置的插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清空文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //通过 npm 安装
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/*    */
const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
   return path.join(__dirname, dir)
}

module.exports = {
   entry: {
      common: ['./src/util/common.js'],
      jquery: ['./src/util/jquery.js'],
      product: ['./src/page/product/index.js'],
      index:['./src/page/index/index.js']
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env']
               }
            }]
         },
         {
            test: /\.(jpg|png|gif|bmp|jpeg)$/,
            use: {
               loader: 'url-loader',
               options: {
                  name: '[name]-[contenthash].[ext]',
                  outputPath: 'images/', // 图片输出的路径
                  publicPath: '../images', // 图片生产环境输出的路径
                  limit: 1200
               }
            }
         },
         {
            test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
            use: {
               loader: 'url-loader',
               options: {
                  limit: 10000,
                  name: 'fonts/[name].[contenthash].[ext]'
               }
            }
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader'
            ],
            include: path.join(__dirname, 'src'), //限制范围，提高打包速度
            exclude: /node_modules/
         },
         {
            test: /\.html$/,
            // html中的img标签
            use: ['html-withimg-loader']  // 支持参数：exclude不包含  min 去除html中的换行符，
         },
         {
            test: require.resolve('./src/util/jquery'),
            use: [{
               loader: 'expose-loader',
               options: 'jQuery'
            },{
               loader: 'expose-loader',
               options: '$'
            }]
         }
      ]
   },
   resolve: {
      alias: {
         mode: resolve('node_modules'),
         util: resolve('src/util'),
         page: resolve('src/page'),
         service: resolve('src/service'),
         image: resolve('src/images'),
      }
   },
   plugins: [
      new CleanWebpackPlugin(['dist']), // 文件夹 clean
      new MiniCssExtractPlugin({
         filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
         chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin(getHtmlConfig('product')),
      new HtmlWebpackPlugin(getHtmlConfig('index')),
      new HtmlWebpackPlugin(getHtmlConfig('index2')),
      new webpack.HashedModuleIdsPlugin(),
      new CopyWebpackPlugin([
         {
            from: path.resolve(__dirname, './public'),
            to: 'public',
            ignore: ['.*']
         }
      ])
   ],
   output: {
      path: path.resolve(__dirname, 'dist/static/'),
      publicPath: devMode ? '/' : '../',
      filename: devMode ? 'js/[name].js' : 'js/[name]-[contenthash].js'
   },
}


// 获取html-webpack-plugin参数的方法
function getHtmlConfig (name, title) {
   return {
      template: 'src/html/' + name + '.html',
      filename:  (devMode ? '' : '../') + 'html/' + name + '.html',
      favicon: './src/favicon.ico',
      cache: true,
      inject: true,
      hash: true,
      minify: {
         removeComments: !devMode,    //移除HTML中的注释
         collapseWhitespace: !devMode    //删除空白符与换行符
      },
      chunks: ['common','jquery',name]
   }
}
