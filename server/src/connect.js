import mongoose from 'mongoose'
// Connection URL
const mongoUrl = process.env.MONGO_URL || process.env.MONGO_ATLAS_URL || 'mongodb://venom:venom@localhost:27017/venom'

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export function getConnection () {
  return mongoose.connect(mongoUrl, mongoOptions)
}