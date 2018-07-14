const {addCancelled, fetchScheduleByTime, fetchSchedules, addSchedule, addDelay, fetchDelays, fetchSchedule} = require('../controllers/db')

   

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


router.get('/allschedules', fetchSchedules);
router.get('/schedule', fetchScheduleByTime);



  router.post('/schedules', addSchedule);

  router.post('/delay', addDelay);

  router.post('/cancelled', addCancelled)

  router.get('/delays', fetchDelays);

// router.get('/stationtimes', fetchStationTimetable);

//  router.get('/fetchservices', fetchServices);

// router.use('/articles', routes.articles)


module.exports = router;