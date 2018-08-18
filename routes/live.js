const {fetchLiveStation, fetchStationTimetable, fetchLiveRoute, fetchStationData, fetchStationDepartures, fetchTrainService} = require('../controllers/departures')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


//router.get('/station/:id', fetchStationDepartures);

router.get('/route/', fetchLiveRoute); 
  router.get('/service/:id', fetchTrainService);

  router.get('/station/route/:station_code', fetchStationTimetable)

  router.get('/stationtimes/:station_name', fetchStationDepartures);

  router.get('/station/:station_name', fetchStationData);

  router.get('/station/live/:station_code', fetchLiveStation)
// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;