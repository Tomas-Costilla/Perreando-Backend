const express = require('express')
const app = express()
const router = require('../routes')
const routes = require('../routes/routes')
const serverRouter = router(routes)

app.use(serverRouter)

module.exports = app;