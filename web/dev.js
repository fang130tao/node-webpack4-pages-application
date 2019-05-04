const merge = require('webpack-merge');
const base = require('./base.js');
const webpack = require('webpack') //访问内置的插件

module.exports = merge(base, {
   mode: 'development',   ///'development' or 'production'
   devtool: 'inline-source-map',
   plugins:[
      new webpack.HotModuleReplacementPlugin(), // 热更新插件
   ],
   devServer: {
      historyApiFallback: {
         rewrites: [
            { from: '/product', to: '/html/product.html' },
            { from: '/index', to: '/html/index.html' },
            { from: /.*/, to: '/html/product.html' }
         ]
      },
      contentBase: './dist',
      // compress: true,
      port: 3000,
      host: 'localhost',
      open: false, // 自动拉起浏览器
      hot: true // 热加载
      // lazy: true
      // historyApiFallback: {
      //    rewrites: [
      //       { from: /\/$/, to: '/views/landing.html' },
      //       { from: /^\/subpage/, to: '/views/subpage.html' },
      //       { from: /./, to: '/views/404.html' }
      //    ]
      // }
   }

})
