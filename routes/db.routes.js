const express  = require('express');
const router = express.Router();
const {removeRouteFromId, fetchStartStation, fetchStartStationByStartId, addNewRoute, fetchAllRoutes} = require('../controllers/db.routes');

router.get('/', fetchAllRoutes);

router.post('/', addNewRoute);

router.get('/start/:start_id', fetchStartStationByStartId);

router.get('/start', fetchStartStation);

router.delete('/:route_id', removeRouteFromId);


module.exports = router;