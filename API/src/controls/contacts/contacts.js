const conex = require('../../database/conex')
const fs = require('fs/promises')
const listarContatos = async (req, res) => {
    try {
        const { rows: contacts } = await conex.query('SELECT * FROM contacts');
        for (const contato of contacts) {
            const { rows: shipments } = await conex.query('select * from shipments where id_contato = $1', [contato.id]);
            contato.shipments = shipments
        }
        return res.status(200).json(contacts);

    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const cadastrarContatos = async (req, res) => {
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
        const contato = await conex.query(query, [id, nome, numero])
        if (contato.rowCount === 0) {
            return res.status(400).json('Não foi possível cadatrar autor')
        }
        return res.status(200).json('contato cadastrado com sucesso')

    } catch (error) {
        return res.status(404).json(error.message)
    }
}
const deletarContato = async (req, res) => {
    const { id } = req.params;
    try {
        const contato = await conex.query('SELECT * FROM contacts WHERE id = $1', [id])

        if (contato.rowCount === 0) {
            return res.status(404).json('esse usuario não foi encontrado')
        }
        const query = 'DELETE FROM contacts WHERE id = $1'
        const contatoExcluido = await conex.query(query, [id])
        if (contatoExcluido.rowCount === 0) {
            return res.status(404).json('não foi possível excluir este autor')
        }

        return res.status(200).json('contato excluido com sucesso')
    } catch (error) {
        return res.status(400).json(error.message)
    }


}


module.exports = {
    listarContatos,
    cadastrarContatos,
    deletarContato
}