const { postDelay, getAllTrains, getLiveStatus, getStationTimetable, postTrain, getStoredTrain } = require('../models/station');



function fetchLiveStation(req, res) {
    if (req.query.stationCode) {
        getLiveStatus(req.query.stationCode)
            .then(userData => {


                // Take a look at each service
                userData.departures.all.forEach(dep => {
                    getStoredTrain(dep.train_uid)
                        .then(train => {
                            // Add service to database if not present
                            if (!train) {
                                postTrain(dep.train_uid, userData.station_name, dep.destination_name, dep.aimed_arrival_time, dep.aimed_departure_time, dep.operator_name)
                                    .then(result => {
                                         if (dep.status === "LATE") {
                                            addToDelay(result.id, userData.date, dep)

                                         }
                                    })
                            } else {
                                 if (dep.status === "LATE") {
                                    addToDelay(train.id, userData.data, dep)
                                 }
                            }

                            
                        })


                    // Add delays to the delayed train table
                    // if (dep.status === "LATE") {
                    //     postDelay
                    // }
                })

                return res.status(200).send(userData)



            })
    }
}

const addToDelay = function (train_id, date, trainStats ) {
    
    postDelay(date, trainStats.expected_arrival_time, trainStats.expected_departure_time, train_id) 
    .then (data => console.log(data))
}

function fetchStationTimetable(req, res) {
    if (req.query.stationCode) {
        getStationTimetable(req.query.stationCode, req.query.date, req.query.time)
            .then(userData => {


                return res.status(200).send(userData)

            })
    }
}

function fetchServices(req, res) {
    getAllTrains()
    .then(data => res.status(200).send(data)  )
}




module.exports = { fetchLiveStation, fetchStationTimetable, fetchServices };