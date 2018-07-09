const {fetchDepartures} = require('../controllers/departures')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


router.get('/departures', fetchDepartures);


//  router.get('/livestation', fetchLiveStation);

// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;