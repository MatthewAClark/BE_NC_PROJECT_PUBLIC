process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const checkLiveStatus = require('../modules/autofetch').checkLiveStatus;
const getCurrentDateTime = require('../modules/autofetch').getCurrentDateTime;
const checkForDelays = require('../modules/autofetch').checkForDelays;
const fetchSchedulesByHour = require('../modules/autofetch').fetchSchedulesByHour
const cronSchedule =  require('../modules/autofetch').cronSchedule
const fetchLiveStationsFromSchedules =  require('../modules/autofetch').fetchLiveStationsFromSchedules
const getScheduleByTime = require('../models/db').getScheduleByTime
const getSchedulesWithStationByTime = require('../models/db').getSchedulesWithStationByTime
const postDelay = require('../models/db').postDelay
const addStatusToDB = require('../modules/autofetch').addStatusToDB

// db API endpoint test
describe('/api/db/stations', () => {
    it('Fetches all stations from our db', () => {
        return request(app) // run mock server
        .get('/api/db/stations')
        .expect(200)
        .then(res => {
            expect(res.body.length).to.equal(2)
            expect(res.body[0].station_name).to.equal('Liverpool South Parkway')
        })
    })
    it('Returns a station when fetching an ID', () => {
        return request(app) // run mock server
        .get('/api/db/stations/1')
        .expect(200)
        .then(res => {
            expect(res.body.station_name).to.equal('Liverpool South Parkway')
        })
    })
})

describe('/api/db/schedules', () => {
    it('GETs all scheduled data from the database', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedules')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                // chai expect
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(6);
                expect(res.body[0].train_uid).to.equal('Y23257')
            })

    })
    it('GETs schedule id from the database', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedules/2')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                // chai expect
                
                expect(res.body).to.be.an('object');
               // expect(res.body.length).to.equal(6);
                expect(res.body.train_uid).to.equal('Y23261')
            })

    })

    it('GETs schedule by dep time', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedules/?departure_time=13:09:00')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                //console.log(res.body)
                // chai expect
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                expect(res.body[0].train_uid).to.equal('Y23261')
            })

    })

    it('POSTs a new train to the schedule db', () => {
        // runs mock server
        return request(app)
            //get request to mock server
            .post('/api/db/schedules')
            .send({
                train_uid: "C40123",
                train_departure_origin: "Manchester Airport",
                train_arrival_destination: "Liverpool South Parkway",
                departure_time: "15:18",
                arrival_time: "15:15",
                train_operator: "Great Northern Railway",
                user_starting_station: 2,
                user_finish_station: 1
            })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                expect(res.body).to.be.an('object');

               expect(res.body.train_uid).to.equal("C40123")
            })
    })

    describe('/api/db/delays', () => {
        it('GETs all delays from the delay db', () => {
            // runs mock server
            return request(app)
                // get request to mock server
                .get('/api/db/delays')
                // supertest expect  - key on promise object
                .expect(200)
                .then((res) => {
                    // chai expect
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(3);
                    expect(res.body[0].train_id).to.equal(2)
                })
        })

        it('POSTs a delayed train to the delay db', () => {
            // runs mock server
            return request(app)
                //get request to mock server
                .post('/api/db/delays')
                .send({
                    date_of_delay: "2018-07-09",
                    expected_arrival_time: "15:39",
                    expected_departure_time: "15:42",
                    cancelled: false,
                    train_id: 1
                })
                // supertest expect  - key on promise object
                .expect(201)
                .then(res => {
                    // chai expect
                     expect(res.body).to.be.an('object');
                     expect(res.body.train_id).to.equal(1)
                     expect(res.body.expected_departure_time).to.equal("15:42:00")
                   
                })
        })

        it('POSTs a cancelled train to the delay db', () => {
            // runs mock server
            return request(app)
                //get request to mock server
                .post('/api/db/delays')
                .send({
                    date_of_delay: "2018-07-09",
                    train_id: 2,
                    cancelled: true
                })
                // supertest expect  - key on promise object
                .expect(201)
                .then(res => {
                    // chai expect
                    expect(res.body).to.be.an('object');
                    expect(res.body.train_id).to.equal(2)
                    expect(res.body.cancelled).to.equal(true)
                })
        })

    })
})

// Procedure for automaticallly checking delays

// Cron schedule calls getSchedulesWithStationByTime. This returns an array with all schedules with given dep time 

// Fetch all departures with given time
describe('Fetch all schedules from db with given time', () => {
    it('GETs all live schedules from a station', () => {
        getSchedulesWithStationByTime('12:24')
        // runs mock server
      //  return request(app)
            // get request to mock server
           // .get('/api/live/station/live/EXD')
            // supertest expect  - key on promise object
        //    .expect(200)
            .then((res) => {
                console.log(res)

                // chai expect
                  expect(res).to.be.an('array');
                  expect(res[0].station_name).to.equal('Exeter St Davids')
                 expect(res[0].train_arrival_destination).to.equal('Newcastle');
                 expect(res[0].departure_time).to.equal('12:24:00');

            })

    })
})

// Fetch live status from these schedules
describe.only('fetchLivStationsFromSchedules', () => {
    it('Returns live status from given schedules', () => {
        fetchLiveStationsFromSchedules([ { 'train_id': 7,
            'train_uid': 'C76193',
            'train_departure_origin': 'Plymouth',
            'train_arrival_destination': 'Newcastle',
            'arrival_time': '12:22:00',
            'departure_time': '12:24:00',
            'train_operator': 'Crosscountry',
            'route_id': 4,
            'starting_station': 4,
            'finish_station': 3,
            'station_id': 4,
            'station_name': 'Exeter St Davids',
            'station_code': 'EXD',
            'user_station_type': null } ])
        // runs mock server
      //  return request(app)
            // get request to mock server
           // .get('/api/live/station/live/EXD')
            // supertest expect  - key on promise object
        //    .expect(200)
            .then((res) => {
                expect(res).to.be.an('array')
                expect(res[0].data.departures.all[0].train_uid).to.equal('C76193')
                expect(res[0].data.departures.all[0].train_id).to.equal(7)
                console.log(res[0].data.departures)

                // chai expect
                //   expect(res).to.be.an('array');
                //   expect(res[0].station_name).to.equal('Exeter St Davids')
                //  expect(res[0].train_arrival_destination).to.equal('Newcastle');
                //  expect(res[0].departure_time).to.equal('12:24:00');

            })

    })
})

describe('addStatusToDB', () => {
    it('', () => {
        addStatusToDB([{
            "date": "2018-08-13",
            "time_of_day": "12:01",
            "request_time": "2018-08-13T12:01:41+01:00",
            "station_name": "Exeter St Davids",
            "station_code": "exd",
            "departures": {
                "all": [{
                    "mode": "train",
                    "service": "22180011",
                    "train_uid": "C76193",
                    "platform": "5",
                    "operator": "XC",
                    "operator_name": "CrossCountry",
                    "aimed_departure_time": "12:24",
                    "aimed_arrival_time": "12:22",
                    "aimed_pass_time": null,
                    "origin_name": "Plymouth",
                    "destination_name": "Newcastle",
                    "source": "Network Rail",
                    "category": "XX",
                    "service_timetable": {
                        "id": "https://transportapi.com/v3/uk/train/service/train_uid:C76193/2018-08-13/timetable.json?app_id=02fcc956&app_key=e1c1da0ba1fd90013ac8d9481e4106fd&darwin=true&live=true"
                    },
                    "status": "LATE",
                    "expected_arrival_time": "12:23",
                    "expected_departure_time": "12:25",
                    "best_arrival_estimate_mins": 21,
                    "best_departure_estimate_mins": 23
                }]}}])
        // runs mock server
      //  return request(app)
            // get request to mock server
           // .get('/api/live/station/live/EXD')
            // supertest expect  - key on promise object
        //    .expect(200)
            .then((res) => {
                
               // console.log(res)

                // chai expect
                   expect(res).to.be.an('array');
                //   expect(res[0].station_name).to.equal('Exeter St Davids')
                //  expect(res[0].train_arrival_destination).to.equal('Newcastle');
                //  expect(res[0].departure_time).to.equal('12:24:00');

            })

    })
})






describe('post a schedule perfomance', () => {
    it('posts a delay', () => {
        postDelay('2018-08-13', '2018-08-13', '13:50', '13:51', 'LATE', 7)
        // runs mock server
      //  return request(app)
            // get request to mock server
           // .get('/api/live/station/live/EXD')
            // supertest expect  - key on promise object
        //    .expect(200)
            .then((res) => {
                //console.log(res)

                // chai expect
                  expect(res).to.be.an('object');
                 expect(res.expected_date_departure).to.equal('2018-08-13');
                 expect(res.expected_departure_time).to.equal('13:51:00');

            })

    })
})

// fetch a live status from Transport API for a given station
describe('/api/live/station/live/EXD', () => {
    it('GETs all live schedules from a station', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/live/station/live/EXD')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                
                console.log(res.body.data)
                // chai expect
                //  expect(res.body).to.be.an('array');
                expect(res.body.data.station_name).to.equal('Exeter St Davids');

            })

    })
})




describe('/api/route/MAN/?destination=LPY', () => {
    it('GETs all live schedules from a station', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/live/route/MAN/?destination=LPY')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                //console.log(res.body)
                expect(res.body.station_name).to.equal('Manchester Piccadilly');
                expect(res.body.departures.all[0].destination_name).to.equal('Liverpool South Parkway')
            })

    })
})

// describe('/api/route/MAN/?destination=LPY', () => {
//     it('GETs all live schedules for a service', () => {
//         // runs mock server
//         return request(app)
//             // get request to mock server
//             .get('/api/live/service/Y23259?date=2018-07-16')
//             // supertest expect  - key on promise object
//             .expect(200)
//             .then((res) => {
                
//                 // chai expect
//                  expect(res.body.stops).to.be.an('array');
//                  expect(res.body.stops.length).to.equal(12)
//                  expect(res.body.stops[0].station_name).to.equal('Manchester Airport')
//                 // expect(res.body.length).to.equal(8);
//             })

//     })

// })

// describe.only('', () => {
//     it('', () => {
//         fetchSchedulesByHour()
//         .then(res => {
//             expect(res[0][0].train_uid).to.equal('Y23240')
//             expect(res[4][0].train_uid).to.equal('Y23259')
//             return res
//         })
//         .then(res => {
//             cronSchedule(res)
//         })
//     })
// })


// cron database test

// This section tests whether the pulling of live data for train perfomance is working
// Fetch train from simulated transport API
// Strip hours and mins off to store it in cron
// Cron should then call another function that fetches all train departures at a specific time
// 



// describe.only('', () => {
//     it('', () => {
//         // checkLiveStatus('22:07', '2018-07-16')
//         // .then(res => {
//         //    checkForDelays(res)
//         getScheduleByTime('13:20')
//             .then(res => {
//                 console.log(res)
//            })
//        // })
//     })
// })

// // db

// })








//     describe('get current time', () => {
//         it('returns test', () => {
//             // expect(autoFetch()).to.equal('')
//             console.log(getCurrentDateTime())
//         })
//     })

//     describe('check for delays', () => {
//         it('returns delays', () => {
//             // expect(autoFetch()).to.equal('')
//             checkForDelays('13:38:00', '2018-07-16')
//         })
