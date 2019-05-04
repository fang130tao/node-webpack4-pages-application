const merge = require('webpack-merge');
process.env.NODE_ENV = 'production'
const base = require('./base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(base, {
   mode: 'production',
   devtool: 'source-map',
   plugins: [
      new UglifyJSPlugin({
         sourceMap: true
      }),
      new webpack.DefinePlugin({
         'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new OptimizeCSSAssetsPlugin({})
   ],
   /*  默认的配置已经够用了，所以这里就简洁地配置  */
   optimization: {
      runtimeChunk: 'single',
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendors',
               chunks: 'all'
            }
         }
      }
   }
})
