const mongoose = require('mongoose')
// Connection URL
const defaultMongoUrl = 'mongodb://venom:venom@localhost:27017/venom'

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = {
    getConnection () {
      const mongoUrl = process.env.MONGO_URL || process.env.MONGO_ATLAS_URL || defaultMongoUrl
      return mongoose.connect(mongoUrl, mongoOptions)
    }
}
