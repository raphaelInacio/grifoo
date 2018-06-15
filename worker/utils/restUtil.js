const unirest = require('unirest')
const axios = require('axios')
const yargs = require('yargs')
const args = yargs.argv
const url = args.URL

axios.defaults.baseURL = url;
axios.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4='
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