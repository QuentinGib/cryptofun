var User = require('./user-model.js')

// CRUD
// Create
// Retrieve
// Update
// Delete

/**
 * Crée un utilisateur dans la base de données
 * 
 * @function
 * @async
 * 
 * @param {import('./user-model').UserData} userData 
 * @returns {Promise.<import('./user-model').UserMongooseDocument>}
 */
module.exports = {
  createUser(userData) {
    const user = new User(userData)
    return user.save().then(() => user)
  },

  getUserById(id) {
    return User.findById(id)
  },

  getUserByLogin(login) {
    return User.findOne({ login })
  },

  getUsers () {
    return User.find()
  },

  modifyUser (userData) {
    User.findById(userData.id)
      .then(user => {
        // (...)
      })
  },

  deleteUser (user) {
    User.deleteOne({ id: user.id })
  }
}
