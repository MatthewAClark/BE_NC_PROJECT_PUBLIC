const express  = require('express');
const router = express.Router();
const { removeStation, addNewStation, fetchStation, fetchStationById} = require('../controllers/db.stations');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/', fetchStation);

router.get('/test', async (req, res) => {
    console.log('getting data test')
        try {
          const client = await pool.connect()
          const result = await client.query('SELECT * FROM test_table');
          const results = { 'results': (result) ? result.rows : null};
          res.render('pages/db', results );
          client.release();
        } catch (err) {
          console.error(err);
          res.send("Error " + err);
        }
      })


router.get('/:station_id', fetchStationById);

router.post('/', addNewStation);

router.delete('/:station_id', removeStation);

module.exports = router;