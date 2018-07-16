const express  = require('express');
const router = express.Router();
const {addNewDelay, fetchAllDelays, fetchDelayById} = require('../controllers/db.delays')

router.get('/', fetchAllDelays)

router.get('/:schedule_id', fetchDelayById)

router.post('/', addNewDelay)

module.exports = router