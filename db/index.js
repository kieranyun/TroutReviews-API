const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.USER,
  host:'localhost',
  database: 'reviews',
  port: process.env.PORT,
})

module.exports = {
  query: (query, params) => {
    return pool.query(query, params)
  },
}