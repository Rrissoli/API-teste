const conex = require('../../database/conex')
const { format } = require('date-fns')
const listarEnvios = async (req, res) => {

    try {
        const query = `SELECT m.id, c.nome,c.numero, m.msg, m.data_criado, m.data_envio,m.status from shipments m
left join contacts c on m.id_contato = c.id`
        let { rows: shipments } = await conex.query(query)
        return res.status(200).json(shipments)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
const cadastrarMensagem = async (req, res) => {
    const { id, msg, data_criado, data_envio, status } = req.body
    if (!id) {
        return res.status(400).json('Precisamos do id aleatório')
    }
    try {
        const query = 'INSERT INTO shipments (id,msg, data_criado, data_envio, status) values ($1,$2, $3, $4, $5)'
        const contato = await conex.query(query, [id, msg, data_criado, data_envio, status])
        if (contato.rowCount === 0) {
            return res.status(400).json('Não foi possível cadatrar autor')
        }
        return res.status(200).json('mensagem cadastrado com sucesso')

    } catch (error) {
        return res.status(404).json(error.message)
    }
}
const filtrarData = async (req, res) => {
    const {
        data_envio,
    } = req.body
    if (!data_envio) {
        return res.status(404).json('infrome a data a ser filtrada')
    }
    const date = new Date(data_envio);
    const pattern = 'd.M.yyyy HH:mm:ss.SSS';
    const output = format(date, pattern)

    try {
        const { rows: messageEn } = await conex.query(`select * from shipments WHERE data_envio ILIKE '%$1%'`, [output])
        if (messageEn.rowCount === 0) {
            return res.status(404).json('mensagem não encontrada')
        }
        return res.status(200).json(messageEn)
    } catch (error) {
        return res.status(200).json(error.message)
    }
}


module.exports = {
    listarEnvios,
    filtrarData,
    cadastrarMensagem

}