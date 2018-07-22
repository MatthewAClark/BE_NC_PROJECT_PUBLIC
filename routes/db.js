const {addCancelled, fetchScheduleByTime, fetchSchedules, addSchedule, addDelay, fetchDelays, fetchSchedule} = require('../controllers/db')
const dbStations = require('./db.stations.js')
const dbSchedules = require('./db.schedules.js')
const dbDelays = require('./db.delays.js')
const dbDepartures = require('./db.departures.js')
const dbRoutes = require('./db.routes.js')
   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


router.use('/schedules', dbSchedules);
//router.get('/schedule', fetchScheduleByTime);

router.use('/stations', dbStations)

router.use('/delays', dbDelays)

router.use('/departures', dbDepartures)

router.use('/routes', dbRoutes)

  // router.post('/schedules', addSchedule);

  // router.post('/delay', addDelay);

  // router.post('/cancelled', addCancelled)

  // router.get('/delays', fetchDelays);

// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;