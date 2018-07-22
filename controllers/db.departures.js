const { getAllDepartures } = require('../models/db.departures')




function fetchAllDepartures(req, res) {

                console.log('are we here too?')
                getAllDepartures(req.params.route_id, req.query.departure_time_from, req.query.departure_time_to)
                        .then(data => res.status(200).send(data))
                        .catch(err => console.log(err))
 }

module.exports = { fetchAllDepartures }