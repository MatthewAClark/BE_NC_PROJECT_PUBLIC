
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

db = await pool.connect()
module.exports = {db}
//module.exports = 'test'