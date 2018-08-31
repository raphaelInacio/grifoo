const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')
const log4js = require('log4js')


module.exports = function (server) {

    const API_VERSION = "/api/v1"

    server.use(bodyParser.urlencoded({
        extended: true
    }))

    const router = express.Router()

    server.use(bodyParser.json())
    server.use(cors)
    server.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
    server.use(queryParser())
    server.use(API_VERSION, router)
    server.use(API_VERSION, require('../api/parceiros/parceiroController'))
}