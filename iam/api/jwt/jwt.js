const jwt = require('jsonwebtoken')
const eniroments = require('../../config/enviroments')

const getToken = (req) => {
    return req.headers['authorization'].replace('Bearer', '').trim();
}

const containsRole = (sholdHave, role) => {
    sholdHave.filter((item) => { if (role === item) { return true } })
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
                
                rolesExist = 

                if (containsRole(role, payload.roles)) {
                    req.payload = payload;
                    next();
                } else {
                    return res.status(403).send({
                        message: 'Authentication failed, user or Password is Wrong'
                    });
                }
            }
        });

    } else {
        return res.status(403).send({
            message: 'Authentication failed, user or Password is Wrong'
        });
    }
}

const filters = {
    isAdmin: (req, resp, next) => {
        verify(req, resp, next, ['ADMIN'])
    },
    isClient: (req, resp, next) => {
        verify(req, resp, next, ['CLIENTE'])
    },
    isPartner: (req, resp, next) => {
        verify(req, resp, next, ['PARCEIRO'])
    }
}


module.exports = filters