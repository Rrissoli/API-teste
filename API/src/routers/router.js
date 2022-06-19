const express = require('express');
const { listarContatos, cadastrarContatos, deletarContato } = require('../controls/contacts/contacts')
const { listarEnvios, filtrarData } = require('../controls/shipments/shipments')


const router = express()

//contatos
router.get('/contacts', listarContatos);
router.post('/contacts', cadastrarContatos);
router.delete('/contacts/:id', deletarContato)


//Envios
router.get('/shipments', listarEnvios)
router.get('/filtrarData', filtrarData)
module.exports = router
