const express  = require('express');
const router = express.Router();
const {fetchSchedulesAndRoutesByTime, fetchSchedulesByTime, fetchSchedulesByRouteID, fetchSchedules, addNewSchedule, fetchAllSchedules, fetchScheduleById} = require('../controllers/db.schedules')

router.get('/', fetchSchedules)

router.get('/time', fetchSchedulesByTime)

router.get('/time/routes', fetchSchedulesAndRoutesByTime)

router.get('/id/:schedule_id', fetchScheduleById)

router.post('/', addNewSchedule)

router.get('/route/:route_id', fetchSchedulesByRouteID)

router.get('/all', fetchAllSchedules)

module.exports = router