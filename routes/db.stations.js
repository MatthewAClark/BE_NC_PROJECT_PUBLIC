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
       // try {
        //  const client = await pool.connect()
          pool.connect().then(db => {
            db.query('SELECT * FROM train_stations')
            .then(result2 => {
                console.log('this is result 2',result2.row)
            });

          })
         // const result = await client.query('SELECT * FROM train_stations');
         // const results = { 'results': (result) ? result.rows : null};
          //console.log(results)
         // res.render('pages/db', results );
          client.release();
      //  } catch (err) {
          console.error(err);
          res.send("Error " + err);
      //  }
      })


router.get('/:station_id', fetchStationById);

router.post('/', addNewStation);

router.delete('/:station_id', removeStation);

module.exports = router;