const mongoose = require('mongoose')
const { hash } = require('../utils/crypto.js')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    login: {
      type: String,
      required: [true, "Le nom d'utilisateur est manquant"],
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est manquant']
    },
    holdings: {
      type: Object,
      required: [true, "Aucun holdings initialisé"]
    },
    holdingDolls: {
      type: Number,
      required: [true, "Pas d'argent initialisé"]
    }
  }
)

UserSchema.set('toJSON', {
  transform (doc, ret) {
    delete ret.password
    return ret
  }
})

UserSchema.pre('save', function preSave () {
  const user = this

  if (!user.isModified('password')) {
    return
  }
  user.password = hash(user.password)
})

module.exports = mongoose.model('User', UserSchema)
