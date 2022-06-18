const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./src/routers/router');

const app = express()



app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors())
app.use(router);



const port = process.env.PORT || 3000
app.listen(port)
