const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
module.exports = {
    getConnectionToMongoDB () {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function(err, client) {
                if (err) {
                    reject(err)
                    return
                }
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                resolve({
                    db,
                    client
                })
            });
        })
    }
}
// Use connect method to connect to the server
