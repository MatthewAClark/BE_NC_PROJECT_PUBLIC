const express  = require('express');
const router = express.Router();
const {addNewSchedule, fetchAllSchedules, fetchScheduleById} = require('../controllers/db.schedules')

router.get('/', fetchAllSchedules)

router.get('/:schedule_id', fetchScheduleById)

router.post('/', addNewSchedule)

module.exports = router