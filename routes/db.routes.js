const express  = require('express');
const router = express.Router();
const { addNewRoute, fetchAllRoutes, fetchRouteByStartStation} = require('../controllers/db.routes')

router.get('/', fetchAllRoutes)

router.post('/', addNewRoute)

 router.get('/start/:station_id', fetchRouteByStartStation)

// router.post('/', addNewStation)

// router.delete('/:station_id', removeStation)

module.exports = router