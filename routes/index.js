const router = require('koa-router')()

router.get('/', async (ctx, next) => {
   await ctx.render('html/product.html', {})
})

router.get('/index', async (ctx, next) => {
   await ctx.render('html/index.html', {})
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
