const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST || 'localhost',
  database: process.env.DB || 'reviews',
  port: process.env.DBPORT,
});

module.exports = {
  query: (query, params) => pool.query(query, params),
};
