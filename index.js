'use strict'

const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const cacheControl = require('koa-cache-control')

const app = new Koa()
const router = new Router()

router.get(
  '/route/random',
  async (ctx, next) => {
    const routePath = ctx.params.routePath
    await next()
    ctx.response.body = { number: Math.floor(Math.random() + 100) }
  },
  cacheControl({
    maxAge: 3600,
    sMaxAge: 60,
  })
)

app.use(logger())
app.use(cacheControl())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log(`Cache-Tester Server app started on port 3000`)
})
