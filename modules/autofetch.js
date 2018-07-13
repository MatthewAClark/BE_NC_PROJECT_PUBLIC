const { getSchedules } = require('../models/db.js');
const cron = require('node-cron');

const autoFetch = (hour) => {
    str = '13:55:00'
    //res = str.match(/(?:(?!:).)*/)
    console.log(str.slice(0, 2))

    // fetch all schedules from db
    getSchedules()
        .then(result => {
            //  console.log(result)

            let scheduleByHour = []
            for (let i = 0; i < 24; i++) {
                let iChar = ''
                if (i < 10) iChar = `0${i}`; else iChar = `${i}`

                let currSchedule = result.filter(schedule =>
                    schedule.departure_time.slice(0, 2) === iChar).map(schedule =>
                        Number(schedule.departure_time.slice(3, 5)))


                if (currSchedule.length > 0) {
                    currSchedule = currSchedule.filter((minutes, pos) => currSchedule.indexOf(minutes) === pos).sort().join(',') + ` ${i} * * *`
                }
                if (currSchedule.length > 0) {
                 console.log(currSchedule)
                scheduleByHour.push(currSchedule)
                }

                


            }

            for (let i = 0; i < scheduleByHour.length; i++) {
                cron.schedule(scheduleByHour[i], function () {
                    console.log('we are here!!!')


               })

            
            
            }
            return scheduleByHour
        })
        .then(res => console.log(res))



}


module.exports = autoFetch