const express  = require('express');
const router = express.Router();
const {fetchSchedulesByRouteID, fetchSchedules, addNewSchedule, fetchAllSchedules, fetchScheduleById} = require('../controllers/db.schedules')

router.get('/', fetchSchedules)

router.get('/id/:schedule_id', fetchScheduleById)

router.post('/', addNewSchedule)

router.get('/route/:route_id', fetchSchedulesByRouteID)

router.get('/all', fetchAllSchedules)

module.exports = router