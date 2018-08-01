const axios = require('axios')
const enviroments = require('../config/enviroments')

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: enviroments.urlParceiros,
});

// Alter defaults after instance has been created;
instance.defaults.headers.common['Authorization'] = `Basic ${enviroments.pass}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';

const parceirosRestIntegration = {
    get: async (resource) => {
        try {
            const response = await instance.get(`${resource}`);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = parceirosRestIntegration