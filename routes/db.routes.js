const express  = require('express');
const router = express.Router();
const {fetchStartStation, fetchStartStationByStartId, addNewRoute, fetchAllRoutes, fetchRouteByStartStation} = require('../controllers/db.routes')

router.get('/', fetchAllRoutes)

router.post('/', addNewRoute)

// router.get('/start/:station_id', fetchRouteByStartStation)

router.get('/start/:start_id', fetchStartStationByStartId)

router.get('/start', fetchStartStation)

// router.post('/', addNewStation)

// router.delete('/:station_id', removeStation)

module.exports = router