const express  = require('express');
const router = express.Router();
const {fetchAllDepartures,} = require('../controllers/db.departures');

// router.get('/', fetchSchedules)

// router.get('/id/:schedule_id', fetchScheduleById)

// router.post('/', addNewSchedule)

router.get('/all/:station_id', fetchAllDepartures);

module.exports = router;