process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const autoFetch = require('../modules/autofetch').autoFetch;
const getCurrentDateTime = require('../modules/autofetch').getCurrentDateTime;
const checkForDelays = require('../modules/autofetch').checkForDelays

// live api
describe('/api/live/schedules', () => {
    it('GETs all live schedules from a station', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/live/station/MRD')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                console.log(res.body)
                // chai expect
                // expect(res.body).to.be.an('array');
                // expect(res.body.length).to.equal(8);
            })

    })
})

describe('/api/route/MAN/?destination=LPY', () => {
    it.only('GETs all live schedules from a station', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/live/route/MAN/?destination=LPY')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                console.log(res.body)
                // chai expect
                // expect(res.body).to.be.an('array');
                // expect(res.body.length).to.equal(8);
            })

    })
})


it('GETs all live schedules for a service', () => {
    // runs mock server
    return request(app)
        // get request to mock server
        .get('/api/live/service/C42224?date=2018-07-16')
        // supertest expect  - key on promise object
        .expect(200)
        .then((res) => {
            console.log(res.body)
            // chai expect
            // expect(res.body).to.be.an('array');
            // expect(res.body.length).to.equal(8);
        })

})



// db

describe('/api/db/allschedules', () => {
    it('GETs all scheduled data from the database', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/allschedules')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {

                // chai expect
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(9);
            })

    })

    it('GETs schedule by time', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedule/?departure_time=13:27:00')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
                //console.log(res.body)
                // chai expect
                // expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(2);
                expect(res.body[0].arrival_station).to.equal('Barnstaple')
            })

    })

    it('POSTs a new train to the schedule db', () => {
        // runs mock server
        return request(app)
            //get request to mock server
            .post('/api/db/schedules')
            .send({
                train_uid: "C40123",
                departure_station: "Exeter St Davids",
                arrival_station: "Penzance",
                departure_time: "15:18",
                arrival_time: "15:15",
                train_operator: "Great Western Railway"
            })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                expect(res.body).to.be.an('object');

                expect(res.body.newSchedule.train_uid).to.equal("C40123")
            })
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
                expect(res.body.length).to.equal(5);
                expect(res.body[1].train_id).to.equal(3)
            })
    })

    it('POSTs a delayed train to the delay db', () => {
        // runs mock server
        return request(app)
            //get request to mock server
            .post('/api/db/delay')
            .send({
                date_of_delay: "2018-07-09",
                expected_arrival_time: "15:39",
                expected_departure_time: "15:42",
                train_id: 9
            })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                expect(res.body).to.be.an('object');
                expect(res.body.newDelay.train_id).to.equal(9)
                expect(res.body.newDelay.expected_departure_time).to.equal("15:42:00")
            })
    })

    it('POSTs a cancelled train to the delay db', () => {
        // runs mock server
        return request(app)
            //get request to mock server
            .post('/api/db/cancelled')
            .send({
                date_of_delay: "2018-07-09",
                train_id: 2
            })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                console.log(res.body)
                expect(res.body).to.be.an('object');
                expect(res.body.newCancelled.train_id).to.equal(2)
                expect(res.body.newCancelled.cancelled).to.equal(true)
            })
    })


    describe('get current time', () => {
        it('returns test', () => {
            // expect(autoFetch()).to.equal('')
            console.log(getCurrentDateTime())
        })
    })

    describe('check for delays', () => {
        it('returns delays', () => {
            // expect(autoFetch()).to.equal('')
            checkForDelays('13:38:00', '2018-07-16')
        })
    })
})