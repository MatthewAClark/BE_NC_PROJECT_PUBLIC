process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const autoFetch = require('../modules/autofetch');


describe('/api/db/hour', () => {
    it('GETs all scheduled data from the database', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedulehour')
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
                expect(res.body.length).to.equal(8);
            })

    })

    it('GETs one schedule data from the database', () => {
        // runs mock server
        return request(app)
            // get request to mock server
            .get('/api/db/schedule?train_id=1')
            // supertest expect  - key on promise object
            .expect(200)
            .then((res) => {
console.log(res.body)
                // chai expect
                // expect(res.body).to.be.an('array');
                // expect(res.body.length).to.equal(8);
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
                expect(res.body).to.eql({
                    newSchedule: {
                        train_uid: "C40123",
                        departure_station: "Exeter St Davids",
                        arrival_station: "Penzance",
                        departure_time: "15:18:00",
                        train_id: 9,
                        arrival_time: "15:15:00",
                        train_operator: "Great Western Railway"
                    }
                })
            })
    })

})

describe('/api/db/delays', () => {
    it('POSTs a delayed train to the delay db', () => {
        // runs mock server
        return request(app)
            //get request to mock server
            .post('/api/db/delay')
            .send({date_of_delay: "2018-07-09",
                    expected_arrival_time: "15:39",
                    expected_departure_time: "15:42",
                    train_id: 9 })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                expect(res.body).to.be.an('object');
                expect(res.body.newDelay.train_id).to.equal(9)
                expect(res.body.newDelay.expected_departure_time).to.equal("15:42:00")
            })
    })
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
             expect(res.body.length).to.equal(6);
             expect(res.body[1].train_id).to.equal(3)
         })

 
    })

    describe('test timeout output into get schedule function', () => {
        it.only('returns something', () => { 
            expect(autoFetch()).to.equal('')
        })
    })
})