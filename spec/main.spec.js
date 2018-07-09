process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');


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
            .post('/api/db/delays')
            .send({date_of_delay: "2018-07-09",
                    actual_arrival_time: "15:39",
                    actual_departure_time: "15:42",
                    train_id: 9 })
            // supertest expect  - key on promise object
            .expect(201)
            .then(res => {
                // chai expect
                expect(res.body.new_house).to.be.an('object');
                expect(res.body.new_house).to.eql({ house_name: 'Sunnyside', sigil_img: 'pic', words: 'Summer is coming', seat: 'Summerfeld', region: 'The South', id: 5 })
            })
    })
})