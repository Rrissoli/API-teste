// ANALISAR O DATABASE E TROCAR TODAS AS INFOS DE PT_BR para EN_US
// exemplo: id_contato -> id_contact

const connect = require('../connect')
const fs = require('fs/promises')
const contactList = async (req, res) => {
    try {
        const { rows: contacts } = await connect.query('SELECT * FROM contacts');
        for (const contact of contacts) {
            const { rows: shipments } = await connect.query('SELECT * FROM shipments WHERE id_contato = $1', [contact.id]);
            contact.shipments = shipments
        }
        return res.status(200).json(contacts);

    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const contactCreate = async (req, res) => {
    const { nome, numero, id } = req.body
    if (!nome) {
        return res.status(400).json('O campo nome é obrigatório')
    }
    if (!id) {
        return res.status(400).json('Precisamos do id aleatório')
    }
    if (!numero) {
        return res.status(400).json('Precisamos do numero de telefone')
    }
    try {
        const query = 'INSERT INTO contacts (id, nome, numero) values ($1,$2, $3)'
        const contact = await connect.query(query, [id, nome, numero])
        if (contact.rowCount === 0) {
            return res.status(400).json('Não foi possível cadatrar contato')
        }
        return res.status(200).json('contato cadastrado com sucesso')

    } catch (error) {
        return res.status(404).json(error.message)
    }
}
const contactDelete = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await connect.query('SELECT * FROM contacts WHERE id = $1', [id])

        if (contact.rowCount === 0) {
            return res.status(404).json('esse usuario não foi encontrado')
        }
        const query = 'DELETE FROM contacts WHERE id = $1'
        const deletedContact = await connect.query(query, [id])
        if (deletedContact.rowCount === 0) {
            return res.status(404).json('não foi possível excluir este contato')
        }

        return res.status(200).json('contato excluido com sucesso')
    } catch (error) {
        return res.status(400).json(error.message)
    }


}


module.exports = {
    contactList,
    contactCreate,
    contactDelete
}