require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const PORT = process.env.PORT || 5000

require('./config/mongoose.connection')()

app.use(bodyParser.json())

app.use('/public', express.static('public'))

app.use(morgan('dev'))

app.use('/api', require('./routes/users.routes'))
app.use('/api', require('./routes/product.routes'))
app.use('/api', require('./routes/categories.routes'))

app.listen(PORT, () => {
    console.log('server on running...')
})