
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

//.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
     // res.render('pages/db', results );
     console.log(results)
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
//  })

db = pool.connect()
module.exports = {db}
//module.exports = 'test'