/* eslint-disable no-console*/

process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');


const getCurrentDateTime = require('../modules/autofetch').getCurrentDateTime;

const cronSchedule = require('../modules/autofetch').cronSchedule;

const fetchLiveStationsFromSchedules = require('../modules/autofetch').fetchLiveStationsFromSchedules;

const getSchedulesWithStationByTime = require('../models/db').getSchedulesWithStationByTime;
const postStatus = require('../models/db').postStatus;
const addStatusToDB = require('../modules/autofetch').addStatusToDB;
const fetchStatusAndStore = require('../modules/autofetch').fetchStatusAndStore;
const cronSetup = require('../modules/autofetch').cronSetup;
const getAllSchedules = require('../models/db.schedules').getAllSchedules;
const getLiveStation = require('../models/departures.test').getLiveStation;

// db API endpoint test

describe('db api endpoints', () => {

  // Stations
  describe('/api/db/stations', () => {
    // Fetch all stations from DB
    it('Fetches all stations from our db', () => {
      return request(app) // run mock server
        .get('/api/db/stations')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(4);
          expect(res.body[0].station_name).to.equal('Liverpool South Parkway');
        });
    });

    // Fetch a station by its unique 3 letter code
    it('returns a station from it`s unique station code', () => {
      return request(app)
        .get('/api/db/stations/?code=LPY')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.station_name).to.equal('Liverpool South Parkway')
        })
    })

    it('Returns a station when fetching an ID', () => {
      return request(app) // run mock server
        .get('/api/db/stations/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.station_name).to.equal('Liverpool South Parkway');
        });
    });

    it('Posts a new station', () => {
      return request(app) // run mock server
        .post('/api/db/stations')
        .send({
          station_name: 'Sheffield',
          station_code: 'SHF',
          user_station_type: 'Lesure'

        })
        .expect(201)
        .then(res => {

          // chai expect
          expect(res.body).to.be.an('object');
          expect(res.body.station_id).to.equal(5)
          expect(res.body.station_name).to.equal('Sheffield');
        });
    })

    it('Deletes a station', () => {
      return request(app)
        .delete('/api/db/stations/4')
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].station_id).to.equal(4)
          expect(res.body[0].station_name).to.equal('Exeter St Davids')
        })
    })


  });
  // **************************************************************************

  // Test routes database
  describe.only('/api/db/routes', () => {
    it('Gets all /api/db/routes', () => {
      return request(app)
        .get('/api/db/routes/')
        .expect(200)
        .then((res) => {
          console.log(res.body)
        })
    })
  })





  // Test schedule db endpoints
  describe('/api/db/schedules/all', () => {
    it('GETs all scheduled data from the database', () => {
      // runs mock server
      return request(app)
        // get request to mock server
        .get('/api/db/schedules/')
        // supertest expect  - key on promise object
        .expect(200)
        .then((res) => {
          // chai expect
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(8);
          expect(res.body[0].train_uid).to.equal('Y23257');
        });

    });


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
          expect(res.body[0].train_uid).to.equal('Y23261');
        });

    });
    it('POSTs a new train to the schedule db', () => {
      // runs mock server
      return request(app)


        //get request to mock server
        .post('/api/db/schedules')
        .send({
          train_uid: 'C40123',
          train_departure_origin: 'Manchester Airport',
          train_arrival_destination: 'Liverpool South Parkway',
          departure_time: '15:18',
          arrival_time: '15:15',
          train_operator: 'Great Northern Railway',
          route_id: 2
        })
        // supertest expect  - key on promise object
        .expect(201)
        .then(res => {
          // chai expect
          expect(res.body).to.be.an('object');

          expect(res.body.train_uid).to.equal('C40123');
        });
    });

  });

  describe('/api/db/status', () => {
    it('GETs all train`s status from the performance db', () => {
      // runs mock server
      return request(app)
        // get request to mock server
        .get('/api/db/status')
        // supertest expect  - key on promise object
        .expect(200)
        .then((res) => {

          // chai expect
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(7);
          expect(res.body[0].train_id).to.equal(2);
        });
    });

    it('POSTs a delayed train to the status db', () => {
      // runs mock server
      return request(app)
        //get request to mock server
        .post('/api/db/status')
        .send({
          schedule_date: '2018-07-09',
          expected_arrival_time: '15:39',
          expected_departure_time: '15:42',
          train_status: 'LATE',
          train_id: 1
        })
        // supertest expect  - key on promise object
        .expect(201)
        .then(res => {
          // chai expect
          expect(res.body).to.be.an('object');
          expect(res.body.train_id).to.equal(1);
          expect(res.body.expected_departure_time).to.equal('15:42:00');

        });
    });


  });

});

describe('Live API Test', () => {
  describe('/api/route/?from=MAN&to=LPY', () => {
    it('GETs all live schedules from a station to another station', () => {
      // runs mock server
      return request(app)
        // get request to mock server
        .get('/api/live/route/?from=MAN&to=LPY')
        // supertest expect  - key on promise object
        .expect(200)
        .then((res) => {

          expect(res.body.station_name).to.equal('Manchester Piccadilly');
          expect(res.body.departures.all[0].destination_name).to.equal('Liverpool Lime Street (High Level)');
        });

    });
  });

  describe('/api/live/station/Leeds', () => {
    it('GET Station data', () => {
      // runs mock server
      return request(app)
        // get request to mock server
        .get('/api/live/station/Leeds')
        // supertest expect  - key on promise object
        .expect(200)
        .then((res) => {

          expect(res.body.member[0].name).to.equal('Leeds');
          expect(res.body.member[0].station_code).to.equal('LDS');
        });

    });
  });
});

/*  */

describe('Procedures for fetching and posting train data for backend status checks', () => {
  describe('getAllSchedules', () => {
    it('Fetches all schedules from db', () => {
      getAllSchedules().then(result => {
        expect(result).to.be.an('array');
        expect(result[6].train_uid).to.equal('C76193');
      });
    });
  });


  // Fetch all departures with given time
  describe('getScheduleWithStationByTime', () => {
    it('Fetch all schedules from db with given time', () => {
      getSchedulesWithStationByTime('12:24')
        .then((res) => {
          expect(res).to.be.an('array');
          expect(res[0].station_name).to.equal('Exeter St Davids');
          expect(res[0].train_arrival_destination).to.equal('Newcastle');
          expect(res[0].departure_time).to.equal('12:24:00');
        });
    });
  });

  // fetch a live status from Transport API for a given station
  describe('getLiveStation', () => {
    it('GETs all live schedules from a stations code', () => {
      getLiveStation('EXD')
        .then((res) => {
          expect(res.station_name).to.equal('Exeter St Davids');
        });
    });
  });

  describe('postStatus', () => {
    it('posts the status of a particular schedule', () => {
      postStatus('2018-08-13', '2018-08-13', '13:50', '13:51', 'LATE', 7)
        .then((res) => {
          expect(res).to.be.an('object');
          expect(res.expected_date_departure).to.equal('2018-08-13');
          expect(res.expected_departure_time).to.equal('13:51:00');
        });
    });
  });
});

describe('Procedures for creating cron scheduling', () => {
  describe('cronSchedule', () => {
    it('Returns the correct syntax to work with node-cron schedular', () => {
      expect(cronSchedule([{ 'departure_time': '12:52' }, { 'departure_time': '13:24' }, { 'departure_time': '12:48' }, { 'departure_time': '13:51' }])).to.eql(['47,51 12 * * *', '23,50 13 * * *']);
    });
  });

  describe('cronSetup', () => {
    it('Sets up node-cron to fetch train status', () => {
      cronSetup(['31,32 13 * * *', '20 14 * * *']);
      cronSetup(['31,33 13 * * *', '20 14 * * *']);
    });
  });

});

describe('Procedures for processing train status', () => {

  describe('getCurrentDateTime', () => {
    it('console.log date and time', () => {
      console.log(getCurrentDateTime());
    });
  });

  // Fetch live status from these schedules
  describe('fetchLivStationsFromSchedules', () => {
    it('Returns live status from given schedules', () => {
      fetchLiveStationsFromSchedules([{
        'train_id': 7,
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
        'user_station_type': null
      }])

        .then((res) => {

          expect(res).to.be.an('array');
          expect(res[0].departures.all[0].train_uid).to.equal('C76193');
          expect(res[0].departures.all[0].train_id).to.equal(7);
        });

    });
  });

  describe('addStatusToDB', () => {
    it('stores live train status into db', () => {
      addStatusToDB([{
        'date': '2018-08-13',
        'time_of_day': '12:01',
        'request_time': '2018-08-13T12:01:41+01:00',
        'station_name': 'Exeter St Davids',
        'station_code': 'exd',
        'departures': {
          'all': [{
            'mode': 'train',
            'service': '22180011',
            'train_uid': 'C76193',
            'platform': '5',
            'operator': 'XC',
            'operator_name': 'CrossCountry',
            'aimed_departure_time': '12:24',
            'aimed_arrival_time': '12:22',
            'aimed_pass_time': null,
            'origin_name': 'Plymouth',
            'destination_name': 'Newcastle',
            'source': 'Network Rail',
            'category': 'XX',
            'service_timetable': {
              'id': 'https://transportapi.com/v3/uk/train/service/train_uid:C76193/2018-08-13/timetable.json?app_id=02fcc956&app_key=e1c1da0ba1fd90013ac8d9481e4106fd&darwin=true&live=true'
            },
            'status': 'LATE',
            'expected_arrival_time': '12:23',
            'expected_departure_time': '12:25',
            'best_arrival_estimate_mins': 21,
            'best_departure_estimate_mins': 23,
            'train_id': 7
          }]
        }
      }])

        .then((res) => {

          expect(res).to.be.an('array');
          expect(res[0].train_id).to.equal(7);
          expect(res[0].train_status).to.equal('LATE');
          expect(res[0].expected_departure_time).to.equal('12:25:00');


        });

    });
  });


  describe('fetchStatusAndStore', () => {
    it('Fetches all train status in db at given departure time and store result in DB', () => {
      fetchStatusAndStore('12:24')

        .then((res) => {

          expect(res).to.be.an('array');
          expect(res[0].train_id).to.equal(7);
          expect(res[0].expected_departure_time).to.equal('12:25:00');

        });

    });
  });


});
