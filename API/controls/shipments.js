// ANALISAR O DATABASE E TROCAR TODAS AS INFOS DE PT_BR para EN_US
// exemplo: data_envio -> shipping_date


const connect = require('../connect')

const shipmentsList = async (req, res) => {
    // não utilizou essa request?
    const { data_envio } = req.body
    try {
        const query = `SELECT m.id, c.nome,c.numero, m.msg, m.data_criado, m.data_envio, m.status FROM shipments m 
        LEFT JOIN contacts c on m.id_contato = c.id`
        let { rows: shipments } = await connect.query(query)
        return res.status(200).json(shipments)
    } catch (error) {
        return res.status(400).json(error.message)
    }

}

// este filtar não esta conseguindo filtrar 
const dataFilter = async (req, res) => {
    //qual o motivo desta requisição e porquê esta fazendo a mesma?
    const { data_envio } = req.body

    try {
        //onde a requisição data_envio se aplicaria nesta query?
        const { rows: messageEn } = await connect.query(`SELECT * FROM shipments`)
        if (messageEn.rowCount === 0) {
            return res.status(404).json('mensagem não encontrada')
        }
        
        return res.status(200).json(messageEn)
    } catch (error) {
        return res.status(200).json(error.message)
    }
}
module.exports = {
    shipmentsList,
    dataFilter
}