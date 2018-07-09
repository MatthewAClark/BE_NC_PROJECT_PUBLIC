const { getDepartures } = require('../models/departures');


function fetchDepartures(req, res) {
    if (req.query.stationCode) {
        getDepartures(req.query.stationCode)
            .then(departures => res.status(200).send(departures))
    }
}


module.exports = { fetchDepartures }