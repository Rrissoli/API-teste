const conex = require('../../database/conex')

const listarEnvios = async (req, res) => {
    const { data_envio } = req.body
    try {
        const query = `SELECT m.id, c.nome,c.numero, m.msg, m.data_criado, m.data_envio,m.status from shipments m
left join contacts c on m.id_contato = c.id`
        let { rows: shipments } = await conex.query(query)
        return res.status(200).json(shipments)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
const filtrarData = async (req, res) => {
    const {
        data_envio,
    } = req.body

    try {
        const { rows: messageEn } = await conex.query(`select * from shipments`)
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

}