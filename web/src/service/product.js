
var _mm = require('util/mm.js');

var _product = {
   // 获取商品列表
   get_data : function(listParam, resolve, reject){
      _mm.request({
         url     : _mm.getServerUrl('/static/api/product.js'),
         data    : listParam,
         success : resolve,
         error   : reject
      });
   },
   // 获取商品详细信息
   getProductDetail : function(productId, resolve, reject){
      _mm.request({
         url     : _mm.getServerUrl('/product/detail.do'),
         data    : {
            productId : productId
         },
         success : resolve,
         error   : reject
      });
   }
}
module.exports = _product;
