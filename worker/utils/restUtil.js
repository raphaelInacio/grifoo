const axios = require('axios')
const enviroments = require('../config/enviroments')

axios.defaults.baseURL = enviroments.urlPedidos;
axios.defaults.headers.common['Authorization'] = `Basic ${enviroments.pass}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const restTemplate = {
    get: async (resource) => {
        try {
            const response = await axios.get(`${resource}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = restTemplate