const express  = require('express');
const router = express.Router();
const {removeSchedule, fetchSchedulesAndRoutesByTime,  fetchSchedulesByRouteID, fetchSchedules, addNewSchedule, fetchAllSchedules, fetchScheduleById} = require('../controllers/db.schedules');

router.get('/', fetchSchedules);

router.get('/time/routes', fetchSchedulesAndRoutesByTime);

router.get('/id/:schedule_id', fetchScheduleById);

router.post('/', addNewSchedule);

router.get('/route/:route_id', fetchSchedulesByRouteID);

router.get('/all', fetchAllSchedules);

router.delete('/:schedule_id', removeSchedule);

module.exports = router;