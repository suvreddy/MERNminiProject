require('dotenv').config()
const mongoClient = require('mongodb').MongoClient;

var mongoURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`

async function getDB() {

    const client = await mongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    return client
}

module.exports = {
    getDB
}