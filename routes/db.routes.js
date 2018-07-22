const express  = require('express');
const router = express.Router();
const { fetchAllRoutes, fetchRouteByStartStation} = require('../controllers/db.routes')

router.get('/', fetchAllRoutes)

 router.get('/start/:station_id', fetchRouteByStartStation)

// router.post('/', addNewStation)

// router.delete('/:station_id', removeStation)

module.exports = router