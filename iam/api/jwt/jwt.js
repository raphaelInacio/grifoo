const jwt = require('jsonwebtoken')
const eniroments = require('../../config/enviroments')

module.exports = function (req, res, next) {

    console.log('Aplicando filtro jwt')

    let token = req.headers['authorization'].replace('Bearer', '').trim();

    if (token) {

        jwt.verify(token, eniroments.secret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: err.message });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'Authentication failed. User or Password is Wrong'
        });

    }
}