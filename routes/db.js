
const dbStations = require('./db.stations.js');
const dbSchedules = require('./db.schedules.js');
const dbStatus = require('./db.status');

const dbRoutes = require('./db.routes.js');
   
const express  = require('express');
const router = express.Router();


router.use('/schedules', dbSchedules);

router.use('/stations', dbStations);

router.use('/status', dbStatus);



router.use('/routes', dbRoutes);

  
module.exports = router;