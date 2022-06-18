const express = require('express');
const {
    contactList,
    contactCreate,
    contactDelete
}= require('../controls/contacts')
const {
    shipmentsList,
    dataFilter
} = require('../controls/shipments')

const router = express()

//contacts
router.get('/contacts', contactList);
router.post('/contacts', contactCreate);
router.delete('/contacts/:id', contactDelete)

//shipments
router.get('/shipments', shipmentsList)
router.get('/data', dataFilter)
module.exports = router
