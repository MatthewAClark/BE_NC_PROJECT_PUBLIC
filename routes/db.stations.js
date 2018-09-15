const express  = require('express');
const router = express.Router();
const { removeStation, addNewStation, fetchStation, fetchStationById} = require('../controllers/db.stations');

router.get('/', fetchStation);

router.get('/test', async (req, res) => {
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