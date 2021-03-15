const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes/index.js')

const app = express()

dotenv.config()

const port = 4000

app.use(bodyParser.json())

app.use('/api/v1', router)
getConnectionToMongoDB().then(({db})=> {
  insertDocuments(db,(err)=>{
    if (err){
      console.error(err)
    }
    console.log('OK inserted')
  })

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
