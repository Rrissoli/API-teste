// trocar o endpoint para conectar ao da empresa

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api_teste_envios_agendados',
    password: '1302',
    port: 1302
});
const query = (text, param) => {
    return pool.query(text, param)
}
module.exports = {
    query

}
