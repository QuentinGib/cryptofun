const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes/index.js')

const app = express()

dotenv.config()

const port = 4000

app.use(bodyParser.json())

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
