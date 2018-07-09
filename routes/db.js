const {fetchSchedules, addSchedule} = require('../controllers/db')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


router.get('/schedules', fetchSchedules);


  router.post('/schedules', addSchedule);

  router.post('/delay', addDelay);

// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;