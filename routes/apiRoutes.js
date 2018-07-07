const routes = {
    fetchLiveStation: require('../controllers/station')
}

//const {main} = require('../controllers/index.js')

const express  = require('express');
const router = express.Router();


//router.get('/', main.fetchAll);

 router.get('/fetchStatus', routes.fetchLiveStation);

// router.use('/comments', routes.comments);

// router.use('/topics', routes.topics);

// router.use('/articles', routes.articles)


module.exports = router;