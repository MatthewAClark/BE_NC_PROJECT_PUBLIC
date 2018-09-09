const live = require('./live');
const database = require('./db');

const express  = require('express');
const router = express.Router();

// Point to live TransportAPI portal
router.use('/live', live);

// Use our database
router.use('/db', database);

module.exports = router;