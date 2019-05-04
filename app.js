const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const { _log } = require('./utils/log');

const routes = ['index'];

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/web/dist/static'))

app.use(views(__dirname + '/web/dist'))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes

routes.forEach( (route)=>{
   app.use(require(`./routes/${route}`).routes());
})
// error-handling
app.on('error', (err, ctx) => {
   _log.error('server error', err, ctx)
});

module.exports = app
