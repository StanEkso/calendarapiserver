const pg = require('pg')
// const { db } = require('./config')
// const pool = new Pool(db)
const client = new pg.Client(process.env.DATABASE_URL)

module.exports = client;