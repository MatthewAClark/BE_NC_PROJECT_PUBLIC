const express  = require('express');
const router = express.Router();
const {fetchDelaysWithSchedules, addNewDelay, fetchAllDelays, fetchDelayById} = require('../controllers/db.status')

router.get('/', fetchAllDelays)

router.get('/schedules', fetchDelaysWithSchedules)

router.get('/:schedule_id', fetchDelayById)

router.post('/', addNewDelay)

module.exports = router