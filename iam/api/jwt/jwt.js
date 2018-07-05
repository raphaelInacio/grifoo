const jwt = require('jsonwebtoken')
const eniroments = require('../../config/enviroments')
const RoleTypes = require('../roles/roleTypes')
const errorMessage = 'Authentication failed, User or Password is Wrong'
var createError = require('http-errors')


const getToken = (req) => {
    return req.headers['authorization'].replace('Bearer', '').trim();
}

const verify = (req, res, next, role) => {

    console.log('Aplicando filtro jwt')

    let token = getToken(req)

    if (token) {

        jwt.verify(token, eniroments.secret, function (err, payload) {
            let resposeError = new createError.Unauthorized()
            if (err) {
                return res.json({
                    message: err.message
                });
            } else {
                if (RoleTypes.validateRole(role, payload.roles[0])) {
                    req.payload = payload;
                    next();
                } else {
                    return res.status(403).send({
                        message: errorMessage
                    });
                }
            }
        });

    } else {
        return res.status(403).send({
            message: errorMessage
        });
    }
}

const filters = {
    isAdmin: (req, resp, next) => {
        verify(req, resp, next, [RoleTypes.role.admistrador])
    },
    isClient: (req, resp, next) => {
        verify(req, resp, next, [RoleTypes.role.cliente])
    },
    isPartner: (req, resp, next) => {
        verify(req, resp, next, [RoleTypes.role.parceiro])
    }
}

module.exports = filters