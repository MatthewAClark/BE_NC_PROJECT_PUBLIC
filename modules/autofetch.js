const { getSchedules } = require('../models/db.js');
const { getTrainServiceLive } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getServiceRoute } = require(`../models/departures.${process.env.NODE_ENV}`)
const { getScheduleByTime } = require('../models/db.js');
const { postDelay } = require('../models/db.js')
const cron = require('node-cron');

const autoFetch = () => {

    // fetch all schedules from db
    getSchedules()
        .then(result => {

            // cycle through the 24 hours of the day
            for (let i = 0; i < 24; i++) {

                // add leading zeros if necessary to current loop index as it represents the hour
                let iChar = ''
                if (i < 10) iChar = `0${i}`; else iChar = `${i}`

                // Create a new array with each array representing one hour of train schedules
                const schedulesByHour = result.filter(schedule =>
                    (schedule.departure_time.slice(0, 2) === iChar))

                console.log(schedulesByHour)


                // If there are schedules within that hour, create a schedular
                if (schedulesByHour.length > 0) {

                    //Create schedule string
                    let cronSchedule = schedulesByHour.map(minutes => Number(minutes.departure_time.slice(3, 5)))
                    cronSchedule = cronSchedule.filter((minutes, pos) => cronSchedule.indexOf(minutes) === pos).sort().join(',') + ` ${i} * * *`

                    console.log(cronSchedule)
                    //      scheduleByHour.push(currSchedule)
                    // Create schedule
                    cron.schedule(cronSchedule, function () {
                        const dateTime = getCurrentDateTime()
                        checkForDelays(dateTime.time, dateTime.date)
                    })


                }




            }

        })
        .then(res => {
            console.log(res)
            // read current time and get hours:minutes

        })

        cron.schedule(0, 0 , function () {
            const dateTime = getCurrentDateTime()
            
            checkForDelays(dateTime.time, dateTime.date)
        })

}

// Return the current time of day
const getCurrentDateTime = () => {
    const currDate = new Date()
    return {
        date: `${currDate.getFullYear()}-${(currDate.getMonth() + 1) < 10 ? '0' + (currDate.getMonth() + 1) : (currDate.getMonth() + 1)}-${currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate()}`,
        time: `${currDate.getHours() < 10 ? '0' + currDate.getHours() : currDate.getHours()}:${currDate.getMinutes() < 10 ? '0' + currDate.getMinutes() : currDate.getMinutes()}:00`,
        day : currDate.getDay()
    }
}


const checkForDelays = (departure_time, departure_date) => {

    // fetch schedules data from db where departures match current time
    getScheduleByTime(departure_time, departure_date)
        .then(departures => {

            for (let i = 0; i < departures.length; i++) {
                // fetch from live api
                getTrainServiceLive(departures[i].train_uid, departure_date)
                    .then(status => {

                        const stationData = status.data.stops.find(stop => {

                            return departures[i].departure_station === stop.station_name
                        })

                        // store data into delays table if train is delayed
                        if (stationData.status === 'LATE') {
                            postDelay(departure_date, stationData.expected_arrival_time, stationData.expected_departure_time,
                          departures[i].train_id)
                        }

                    
                        console.log(stationData)
                    })
            }
        })


}

const checkSchedules = () => {
// pull schedules for 24 hours
getServiceRoute()
.then(services => {
    services.
    getSchedules()
    .then(result => {
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

    })
})
// pull schedule db 
// add additional services

// 

}



module.exports = { autoFetch, getCurrentDateTime, checkForDelays }