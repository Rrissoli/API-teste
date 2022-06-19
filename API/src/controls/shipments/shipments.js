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

}