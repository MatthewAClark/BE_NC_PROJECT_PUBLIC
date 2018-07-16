const express  = require('express');
const router = express.Router();
const { removeStation, addNewStation, fetchAllStations, fetchStationById} = require('../controllers/db.stations')

router.get('/', fetchAllStations)

router.get('/:station_id', fetchStationById)

router.post('/', addNewStation)

router.delete('/:station_id', removeStation)

module.exports = router