const port = 3003
const logger = require('../config/logs')
const express = require('express')
const server = express()

server.listen(port, function () {
    logger.info(`Backend pedidos is runing on port ${port}`)
})

module.exports = server