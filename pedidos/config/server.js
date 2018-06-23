const port = 3003

const express = require('express')
const server = express()

server.listen(port , function() {
    console.log(`Backend pedidos is runing on port ${port}`)
})

module.exports = server