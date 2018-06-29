const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: {
        type: Array,
        require: true,
    }
})

module.exports = mongoose.model('User', user)