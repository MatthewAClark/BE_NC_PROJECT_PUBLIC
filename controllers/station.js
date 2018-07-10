const { getLiveService, postDelay, getAllTrains, getLiveStatus, getStationTimetable, postTrain, getStoredTrain } = require('../models/station');

const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);


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

                return s



            })
    }
}

//check times 
const timeDelay = function (num) {


    // console.log(new Date().getHours(),':',new Date().getMinutes())
    // console.log()
    setTimeoutPromise(60000, num).then((value) => {

        let currDate = new Date()
        currentTime = `${currDate.getHours() < 10 ? '0' + currDate.getHours() : currDate.getHours()}:${currDate.getMinutes() < 10 ? '0' + currDate.getMinutes() : currDate.getMinutes()}:00`
        
        currentTime = '19:00:00'
        console.log(currentTime)

              
        getAllTrains()
        .then(data => {
        data.forEach(train => {
            console.log(train.train_uid)
             if(train.departure_time === currentTime) {
                getLiveService(train.train_uid) 
                .then(status => {
                status.forEach(station => {
                    if(station.station_name)
                })}
             }
        })
        
            // if(data.departure_time === currentTime) {
        
            //console.log(data)                // }
        })
        

        timeDelay(currentTime + 1)
    })
        ;
}


timeDelay(0)



const addToDelay = function (train_id, date, trainStats) {

    postDelay(date, trainStats.expected_arrival_time, trainStats.expected_departure_time, train_id)
    //.then(data => console.log(data))
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
        .then(data => res.status(200).send(data))
}




module.exports = { fetchLiveStation, fetchStationTimetable, fetchServices };