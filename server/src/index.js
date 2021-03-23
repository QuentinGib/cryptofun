const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Connection = require('./connect.js')
const app = express()
app.use(cors())

const router = require('./routes/index.js')

const app = express()

dotenv.config()

const port = process.env.PORT || 4000
app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())

app.use('/api/v1', router)
// const { getConnectionToMongoDB } = require('./utils/db.js')
// (...)
function insertDocuments (db, callback) {
  // Get the documents collection
  const collection = db.collection('documents')
  // Insert some documents
  collection.insertMany([
    { a: 1 }, { a: 2 }, { a: 3 }
  ], function (err, result) {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log('Inserted 3 documents into the collection')
    callback(result)
  })
}

/* getConnectionToMongoDB()
  .then(({ db }) => {
    console.log('OK')
    insertDocuments(db, (err) => {
      if (err) {
        console.error(err)
      }
      console.log('OK inserted')
    })
  }).catch(error => {
    console.error(error)
  }) */
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)

Connection.getConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }).catch(error => {
    console.error(error)
  })
