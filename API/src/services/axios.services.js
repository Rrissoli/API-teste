const axios = require("axios");

const instanciaAxios = axios.create({
    baseURL: 'https://dev.integrador.saltzap.com/webhook/33602533-478f-4c6b-83bc-d65c6f20b285',
    params:{
        api_key: "34a8499969c4401daf6a685935323c1d"
    }
})

module.exports = {instanciaAxios}