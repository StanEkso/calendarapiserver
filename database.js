const pg = require('pg')
// const { db } = require('./config')
// const pool = new Pool(db)
const client = new pg.Client({connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }})

client.connect();
module.exports = client;