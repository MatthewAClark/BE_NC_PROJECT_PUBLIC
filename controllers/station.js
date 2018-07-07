const { getLiveStatus } = require('../models/station');



function fetchLiveStatus(req, res) {
                getLiveStatus()
                     .then(userData => res.status(200).send(userData))
            }


        

module.exports =  fetchLiveStatus ;