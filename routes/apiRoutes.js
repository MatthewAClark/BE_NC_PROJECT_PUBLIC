const {fetchLiveStation, fetchServices, fetchStationTimetable} = require('../controllers/station')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


//router.get('/', main.fetchAll);

 router.get('/livestation', fetchLiveStation);

router.get('/stationtimes', fetchStationTimetable);

 router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;