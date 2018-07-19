const express = require('express')
const bodyParser = require('body-parser')
const cors = require('./cors')
const queryParser = require('express-query-int')

module.exports = function (server) {

    const API_VERSION = "/api/v1/iam"

    server.use(bodyParser.urlencoded({
        extended: true
    }))

    const router = express.Router()

    server.use(bodyParser.json())
    server.use(cors)
    server.use(queryParser())
    server.use(API_VERSION, router)
    server.use(API_VERSION, require('../api/accounts/accountsController'))
    server.use(API_VERSION, require('../api/auth/authController'))
}