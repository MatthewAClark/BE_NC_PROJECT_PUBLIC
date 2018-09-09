const express  = require('express');
const router = express.Router();
const {removeStatus, fetchStatusWithSchedules, addNewStatus, fetchAllStatus, fetchStatusById} = require('../controllers/db.status');

router.get('/', fetchAllStatus);

router.get('/schedules', fetchStatusWithSchedules);

router.get('/:status_id', fetchStatusById);

router.delete('/', removeStatus);

router.post('/', addNewStatus);

module.exports = router;