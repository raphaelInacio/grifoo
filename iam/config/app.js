const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')
const jwt = require('jsonwebtoken')
const enviroments = require('./enviroments')

module.exports = function (server) {

    const API_VERSION = "/api/v1"

    server.use(bodyParser.urlencoded({
        extended: true
    }))

    express.set('secret', enviroments.secret)

    const router = express.Router()

    server.use(bodyParser.json())
    server.use(cors)
    server.use(queryParser())
    server.use(API_VERSION, router)
    server.use(API_VERSION, require('../api/user/userController'))
}