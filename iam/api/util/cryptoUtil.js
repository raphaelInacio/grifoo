var bcrypt = require('bcrypt');

const cryptoUtils = {
    hash: (plaintex) => {
        let hash = bcrypt.hashSync(plaintex, 10);
        return hash
    },
    compare: (plaintex, hash) => {
        return bcrypt.compareSync(plaintex, hash)
    }
}

module.exports = cryptoUtils
