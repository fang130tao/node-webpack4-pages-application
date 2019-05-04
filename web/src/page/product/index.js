require('./index.scss')
require('util/swiper/swiper.css')
var Swiper = require('util/swiper/swiper.js')
var _mm = require('util/mm')
var product = require('../../api/product_data.js')

var page = {
   data: {
      page_data: ''
   },
   init: function () {
      this.dom = $('#content')
      this.sidebar = $('#sidebar')
      this.onLoad()
      this.bindEvent()

   },
   onLoad: function () {
      var href = this.set_route() || 'xwzx'
      this.render(href, this.sidebar.find('[href=\'#' + href + '\']'))
   },
   bindEvent: function () {
      let me = this

      /*  点击侧边栏，切换  */
      me.sidebar.find('li').click(function () {
         let a = $(this).find('a')
         me.render(a.attr('href').split('#')[1], a)
         // window.location.reload()
      })
   },
   /*  切换左侧栏的点中状态 */
   trigger_li: function (dom) {
      $('html').animate({ scrollTop: 0 }, 200)
      this.sidebar.find('.sidebar-active').removeClass('sidebar-active')
      dom.addClass('sidebar-active')
   },
   set_route: function () {
      return location.hash && location.hash.split('#')[1]
   },
   init_swiper: function () {
      new Swiper('.swiper-container', {
         direction: 'horizontal',
         slidesPerView: 3,
         // 如果需要前进后退按钮
         navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev'
         }
      })
   },
   // render
   render: function (key, dom) {
      this.dom.html(_mm.renderHtml(('product_render_data'), product.product[key]))
      this.init_swiper()
      this.trigger_li(dom)
   }
};

(function () {
   page.init()
}())




