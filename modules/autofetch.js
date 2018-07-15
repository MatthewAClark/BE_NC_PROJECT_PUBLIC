const { getSchedules } = require('../models/db.js');
const { getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getServiceRoute } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getScheduleByTime } = require('../models/db.js');
const { postDelay } = require('../models/db.js')
const { postCancelled } = require('../models/db.js')
const cron = require('node-cron');

const fetchSchedulesByHour = () => {

    // fetch all schedules from db
    return getSchedules()
        .then(result => {
            let schedulesByHourArr = []
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
        })

}

//                 // If there are schedules within that hour, create a schedular
//                 if (schedulesByHour.length > 0) {
const cronSchedule = (schedulesByHourArr) => {
    for (let i = 0; i < schedulesByHourArr.length; i++) {


        //Create schedule string
        const minutes = schedulesByHourArr[i].map(minutes => Number(minutes.departure_time.slice(3, 5)))

        const hours = schedulesByHourArr[i].map(hours => Number(hours.departure_time.slice(0, 2)))

        const cronSchedule = minutes.filter((elem, pos) => minutes.indexOf(elem) === pos).sort().join(',') + ` ${hours.filter((elem, pos) => hours.indexOf(elem) === pos)} * * *`

        console.log(cronSchedule)
        //      scheduleByHour.push(currSchedule)
        //                     // Create schedule
        cron.schedule(cronSchedule, function () {
            const dateTime = getCurrentDateTime()
            checkForDelays(dateTime.time, dateTime.date)
        })

        //                 }
    }
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
    return {
        date: `${currDate.getFullYear()}-${(currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1)}-${currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate()}`,
        time: `${currDate.getHours() < 10 ? '0' + currDate.getHours() : currDate.getHours()}:${currDate.getMinutes() < 10 ? '0' + currDate.getMinutes() : currDate.getMinutes()}:00`,
        day: currDate.getDay()
    }
}


const checkLiveStatus = (departure_time, departure_date) => {

    // fetch schedules data from db where departures match current time
    return getScheduleByTime(departure_time, departure_date)
        .then(departures => {
            let promises = []
            // console.log('departures', departures)
            for (let i = 0; i < departures.length; i++) {
                // fetch from live api
                promises.push(new Promise(function (res, rej) {
                    getTrainServiceLive(departures[i].train_uid, departure_date)
                .then(live => {
                    
                    res({train_id: departures[i].train_id,
                        departing_station: departures[i].departure_station, 
                        data: live.data})
                } )
                }))

                // scheduleStatus[i] =  getTrainServiceLive//(departures[i].train_uid, departure_date)
                //      .then(status => {
                //   //      console.log('status',status)
                //          const stationData = status.data.stops.find(stop => {

                //              return departures[i].departure_station === stop.station_name
                //          })

                // store data into delays table if train is delayed
                // if (stationData.status === 'LATE') {
                //      postDelay(departure_date, stationData.expected_arrival_time, stationData.expected_departure_time,
                //    departures[i].train_id)
                // }


                //   })

            }
            return Promise.all(promises)
                .then(allStatus => {
                    const stationData = []
                    allStatus.forEach(status => {
                        //console.log('status', status)
                        stationData.push(status)
                        
                    })

                   return (stationData)
                })

        })
}

const checkForDelays = (stationData) => {
    let promises = []
    stationData.forEach(service => {
        service.data.stops.forEach(stop => {
            if(service.departing_station === stop.station_name) {
                if (stop.status === 'LATE') {
                    promises.push(new Promise(function (res, rej) {
                        res(postDelay(stop.aimed_departure_date, stop.expected_departure_date, stop.expected_arrival_time, stop.expected_departure_time,
                                service.train_id))
                    }))

                   
                }
                
                if (stop.status === 'CANCELLED') {
                    promises.push(new Promise(function (res, rej) {
                        res(postCancelled(stop.aimed_departure_date, 
                                service.train_id))
                    }))

                   
                }
                
            }
        })
    })
    return Promise.all(promises)
                
}

// const checkSchedules = () => {
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



module.exports = { checkLiveStatus, fetchSchedulesByHour, cronSchedule, checkForDelays }