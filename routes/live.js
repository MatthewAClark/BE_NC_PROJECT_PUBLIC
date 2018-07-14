const {fetchServiceRoute, fetchStationDepartures, fetchTrainService} = require('../controllers/departures')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


router.get('/station/:id', fetchStationDepartures);

router.get('/route/:id', fetchServiceRoute); 
  router.get('/service/:id', fetchTrainService);

// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;