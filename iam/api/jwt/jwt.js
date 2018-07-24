const jwt = require('jsonwebtoken')
const eniroments = require('../../config/enviroments')
const RoleTypes = require('../roles/roleTypes')
const errorMessage = 'Authentication failed, User or Password is Wrong'

const getToken = (req) => {
    return req.headers['authorization'].replace('Bearer', '').trim();
}

const verify = (req, res, next, role) => {

    console.log('Aplicando filtro jwt')

    let token = getToken(req)

    if (token) {

        jwt.verify(token, eniroments.secret, function (err, payload) {
            if (err) {
                return res.json({
                    message: err.message
                });
            } else {

                let userRole = payload.roles.find(item => item == role)

                if (RoleTypes.validateRole(role, userRole)) {
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
    },
    isAuth: (req, resp, next) => {
        verify(req, resp, next, [RoleTypes.role.autenticado])
    },
    isApp: (req, resp, next) => {
        verify(req, resp, next, [RoleTypes.role.aplicacao])
    }
}

module.exports = filters