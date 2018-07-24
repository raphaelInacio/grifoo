const port = 3005

const express = require('express')
const server = express()

server.listen(port, function () {
    console.log(`Service IAM is runing on port ${port}`)
})

module.exports = server