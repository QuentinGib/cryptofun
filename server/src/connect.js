<<<<<<< HEAD
import mongoose from 'mongoose'
// Connection URL
const mongoUrl = process.env.MONGO_URL || process.env.MONGO_ATLAS_URL || 'mongodb://venom:venom@localhost:27017/venom'
=======
const mongoose = require('mongoose')
// Connection URL
const defaultMongoUrl = 'mongodb://venom:venom@localhost:27017/venom'
>>>>>>> c4acafe506772245d2e313e06627a4e12cdc1ca9

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

<<<<<<< HEAD
export function getConnection () {
  return mongoose.connect(mongoUrl, mongoOptions)
}
=======
module.exports = {
    getConnection () {
      const mongoUrl = process.env.MONGO_URL || process.env.MONGO_ATLAS_URL || defaultMongoUrl
      return mongoose.connect(mongoUrl, mongoOptions)
    }
}
>>>>>>> c4acafe506772245d2e313e06627a4e12cdc1ca9
