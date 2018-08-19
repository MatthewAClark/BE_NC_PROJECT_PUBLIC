const { getSchedules } = require('../models/db.js');
const { getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getLiveStation } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getScheduleByTime } = require('../models/db.js');
const { postDelay } = require('../models/db.js')
const { postCancelled } = require('../models/db.js')
const { getSchedulesWithStationByTime } = require('../models/db.js')
const cron = require('node-cron');

const fetchSchedulesByHour = (schedule) => {




    // fetch all schedules from db
    // return getSchedules()
    // .then(result => {
    //let result = [data]
    let schedulesByHour
    // cycle through the 24 hours of the day
    for (let i = 0; i < 24; i++) {

        // add leading zeros if necessary to current loop index as it represents the hour
        let iChar = ''
        if (i < 10) iChar = `0${i}`; else iChar = `${i}`

        // Create a new array with each array representing one hour of train schedules
        const schedulesByHour = result.filter(schedule =>
            (schedule.departure_time.slice(0, 2) === iChar))


        if (schedulesByHour.length > 0) schedulesByHourArr.push(schedulesByHour)
    }
    //  console.log(schedulesByHourArr)
    return (schedulesByHourArr)
    //   })

}

//                 // If there are schedules within that hour, create a schedular
//                 if (schedulesByHour.length > 0) {
const cronSchedule = (schedule) => {
    let scheduling = []
    //for (let i = 0; i < schedulesByHourArr.length; i++) {
    //console.log(schedulesByHour)
    //Create schedule string
    //   let minutes = schedulesByHourArr.minutes => Number

    let minutes = Number(schedule.departure_time.slice(3, 5))



    //  let hours = schedulesByHourArr.hours => Number
    let hours = Number(schedule.departure_time.slice(0, 2))
    console.log(minutes)

    if (minutes === 0) {
        minutes = 59
        if (hours === 0) {
            hours = 23
        } else {
            hours = hours - 1
        }
    } else {
        minutes = minutes - 1
    }

    console.log(`${hours}:${minutes}`)
    cron.schedule(`${minutes} ${hours} * * *`, function () {
        const dateTime = getCurrentDateTime()
        console.log(`running new fetch at: ${dateTime.time}`)
        fetchStatus(dateTime.time)
            //.then(res => checkForDelays(res))
            .then(res => console.log(res))
    }), false
    //})


    // console.log(minutes)
    //         const cronSchedule = minutes.filter((elem, pos) => minutes.indexOf(elem) === pos).sort((a, b) => a - b).join(',') + ` ${hours.filter((elem, pos) => hours.indexOf(elem) === pos)} * * *`

    //         console.log(cronSchedule)
    //         //      scheduleByHour.push(currSchedule)
    //         //                     // Create schedule
    //         scheduling.push(cron.schedule(cronSchedule, function () {

    //             const dateTime = getCurrentDateTime()
    //             console.log(`running new fetch at: ${dateTime.time}`)
    //             fetchStatus(dateTime.time)
    //                 //.then(res => checkForDelays(res))
    //                 .then(res => console.log(res))
    //         }), false)

    //                 }
    // }
}



//             }

//         })
//         .then(res => {
//             console.log(res)
//             // read current time and get hours:minutes

//         })

//         cron.schedule(0, 0 , function () {
//             const dateTime = getCurrentDateTime()

//             checkForDelays(dateTime.time, dateTime.date)
//         })

// }

// // Return the current time of day
const getCurrentDateTime = () => {
    const currDate = new Date()

    let minutes = Number(currDate.getMinutes())
    let hours = Number(currDate.getHours())

    if (minutes === 59) {
        minutes = 0
        if (hours === 23) {
            hours = 0
        } else {
            hours++
        }
    } else {
        minutes++
    }

    if (minutes < 10) minutes = `0` + minutes
    if (hours < 10) hours = `0` + hours

    return {
        date: `${currDate.getFullYear()}-${(currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1)}-${currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate()}`,
        time: `${hours}:${minutes}:00`,
        day: currDate.getDay()
    }
}

const fetchStatus = (dep_time) => {
    const promises = []
    // Fetch all times from db that depart at given time
    return getSchedulesWithStationByTime(dep_time)
        .then(schedules => {
            //      console.log(schedules)
            //promises.push(new Promise(function (res, rej) {

            // schedules.forEach(schedule => {
            return fetchLiveStationsFromSchedules(schedules)
                .then(schedules => {
                    return addStatusToDB(schedules)
                        .then(result => result)

                })

            //  })
            //  })
            // )
        })

    //  return Promise.all(promises)
}

const fetchLiveStationsFromSchedules = (schedules) => {

    // Ensure we do only one fetch per station
    // Fetch station code from schedules and store them in an array
    const stations = []
    const promises = []
    //   console.log('126',schedules)
    schedules.forEach(schedule => {
        if (stations.indexOf(schedule.station_code) === -1) {
            stations.push(schedule.station_code)
        }
    })

    // Go through each station
    stations.forEach(station => {
        promises.push(new Promise(function (res, rej) {
            getLiveStation(station)
                .then(status => {

                    console.log('144', status.departures.all)
                    // remove all unwanted departures
                    status.departures.all = status.departures.all.filter(elem => {

                        return (schedules.map(uid => uid.train_uid).indexOf(elem.train_uid) !== -1)
                    })

                    // Add train_id to result
                    if (status.departures.all.length > 0) {
                        status.departures.all.map(elem => {
                            elem.train_id = schedules[(schedules.map(uid => uid.train_uid).indexOf(elem.train_uid))].train_id
                            return elem
                        })
                    }


                    // depsOfInterest
                    res(status)
                })

        }))
    })

    return Promise.all(promises)

}

const addStatusToDB = (allStatus) => {
    const promises = []
    allStatus.forEach(station => {
        console.log('172', station.departures.all)
        station.departures.all.forEach(schedule => {
            promises.push(new Promise(function (res, rej) {
                res(postDelay(station.date, station.date, schedule.expected_arrival_time, schedule.expected_departure_time, schedule.status, schedule.train_id))

            }))
        })
    })
    return Promise.all(promises)
}





// const checkLiveStatus = (departure_time, departure_date) => {

//     // fetch schedules data from db where departures match current time
//     console.log(departure_time, 'time')
//     return getScheduleByTime(departure_time)
//         .then(departures => {
//             console.log('here departures', departures)
//             let promises = []
//             // console.log('departures', departures)
//             for (let i = 0; i < departures.length; i++) {
//                 // fetch from live api
//                 promises.push(new Promise(function (res, rej) {
//                     getTrainServiceLive(departures[i].train_uid, departure_date)
//                         .then(live => {
//                             console.log(live)
//                             res({
//                                 train_id: departures[i].train_id,
//                                 departing_station: departures[i].station_name,
//                                 data: live.data
//                             })
//                         })
//                 }))




//             }
//             return Promise.all(promises)
//                 .then(allStatus => {
//                     const stationData = []
//                     allStatus.forEach(status => {
//                         console.log('status', status)
//                         stationData.push(status)

//                     })

//                     return (stationData)
//                 })

//         })
// }

// const checkForDelays = (stationData) => {
//     let promises = []
//     stationData.forEach(service => {
//         service.data.stops.forEach(stop => {
//             if (service.departing_station === stop.station_name) {

//                 promises.push(new Promise(function (res, rej) {
//                     console.log(stop)
//                     console.log('this is what is supposed to be going into db', )
//                     res(postDelay(stop.aimed_departure_date, stop.expected_departure_date, stop.expected_arrival_time, stop.expected_departure_time,
//                         stop.status, service.train_id))
//                 }))






//             }
//         })
//     })
//     return Promise.all(promises)

// }

// const updateArrivalTimes = (stationData) => {
//     getScheduleByTrainUID(stationData.train_uid)
//         .then(res => {
//             if (res.arrival_time !== stationData.data.stops[stationData.data.stops.length - 1]) {
//                 console.log('here now')
//             }
//         })
// }

// // const checkSchedules = () => {
// // pull schedules for 24 hours
// getServiceRoute()
// .then(services => {
//     services.
//     getSchedules()
//     .then(result => {
// getLiveStatus(req.query.stationCode)
//     .then(userData => {


//         // Take a look at each service
//         userData.departures.all.forEach(dep => {
//             getStoredTrain(dep.train_uid)
//                 .then(train => {
//                     // Add service to database if not present
//                     if (!train) {
//                         postTrain(dep.train_uid, userData.station_name, dep.destination_name, dep.aimed_arrival_time, dep.aimed_departure_time, dep.operator_name)
//                             .then(result => {
//                                 if (dep.status === "LATE") {
//                                     addToDelay(result.id, userData.date, dep)

//                                 }
//                             })
//                     } else {
//                         if (dep.status === "LATE") {
//                             addToDelay(train.id, userData.data, dep)
//                         }
//                     }


//                 })

// })
//})
// pull schedule db 
// add additional services

// 

//}



module.exports = { addStatusToDB, fetchLiveStationsFromSchedules, fetchStatus, fetchSchedulesByHour, cronSchedule }