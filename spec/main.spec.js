process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('API', function () {
    describe('/api', () => {
        describe('/api/delays', () => {
            it('GETs all deleyed trains', () => {
                // runs mock server
                return request(app)
                    // get request to mock server
                    .get('/api/delays')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then((res) => {
                        // chai expect
                        expect(res.body).to.be.an('array');
                        // expect(res.body.houses.length).to.equal(4);
                        // expect(res.body).to.eql({
                        //     houses:
                        //         [{ id: 1, house_name: 'Stark', sigil_img: 'pic', words: 'Winter is Coming', seat: 'Winterfell', region: 'The North' },
                        //         { id: 2, house_name: 'Lannister', sigil_img: 'pic', words: 'Hear me roar', seat: 'Casterly Rock', region: 'The Westerlands' }, { id: 3, house_name: 'Baratheon', sigil_img: 'pic', words: 'Ours is the fury', seat: 'Dragonstone', region: 'Blackwater Bay' }, {
                        //             id: 4, house_name: 'Targaryen',
                        //             sigil_img: 'pic', words: 'Fire and blood', seat: null, region: 'Essos'
                        //         }]
                        })
                    })
            })
            it('GETs one house by id', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/houses/1')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        expect(res.body.house).to.be.an('object');
                        expect(res.body).to.eql({ house: { id: 1, house_name: 'Stark', sigil_img: 'pic', words: 'Winter is Coming', seat: 'Winterfell', region: 'The North' } })
                    })
            })
            it('responds with correct error if invalid id given to a GETs by id request', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/houses/7')
                    // supertest expect  - key on promise object
                    .expect(404)
                    .then(res => {
                        // chai expect
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.eql({ status: 404, err: `unable to find house with id 7` })
                    })
            })
            it('POSTs a new house', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .post('/api/houses')
                    .send({ house_name: 'Sunnyside', sigil_img: 'pic', words: 'Summer is coming', seat: 'Summerfeld', region: 'The South' })
                    // supertest expect  - key on promise object
                    .expect(201)
                    .then(res => {
                        // chai expect
                        expect(res.body.new_house).to.be.an('object');
                        expect(res.body.new_house).to.eql({ house_name: 'Sunnyside', sigil_img: 'pic', words: 'Summer is coming', seat: 'Summerfeld', region: 'The South', id: 5 })
                    })
            })




        })

        describe('/api/people', () => {
            it('GETs all people', () => {
                // runs mock server
                return request(app)
                    // get request to mock server
                    .get('/api/people')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then((res) => {
                        // chai expect

                        expect(res.body.people).to.be.an('array');
                        expect(res.body.people.length).to.equal(16);
                        expect(res.body).to.eql({
                            people:
                                [{
                                    id: 1,
                                    name: 'Ned Stark',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 1,
                                    religion_id: 1
                                },
                                {
                                    id: 2,
                                    name: 'Catelyn Stark',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 1,
                                    religion_id: 2
                                },
                                {
                                    id: 3,
                                    name: 'Arya Stark',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 1,
                                    religion_id: 3
                                },
                                {
                                    id: 4,
                                    name: 'Sansa Stark',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 1,
                                    religion_id: null
                                },
                                {
                                    id: 5,
                                    name: 'Jon Snow',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 2,
                                    religion_id: 1
                                },
                                {
                                    id: 6,
                                    name: 'Tyrion Lannister',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 2,
                                    religion_id: null
                                },
                                {
                                    id: 7,
                                    name: 'Jaime Lannister',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 2,
                                    religion_id: 2
                                },
                                {
                                    id: 8,
                                    name: 'Daenerys Targaryen',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 3,
                                    religion_id: null
                                },
                                {
                                    id: 9,
                                    name: 'Viserys Targaryen',
                                    picture_url: null,
                                    dead: true,
                                    house_id: 3,
                                    religion_id: 1
                                },
                                {
                                    id: 10,
                                    name: 'Stannis Baratheon',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 4,
                                    religion_id: 4
                                },
                                {
                                    id: 11,
                                    name: 'Theon Greyjoy',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 4,
                                    religion_id: 3
                                },
                                {
                                    id: 12,
                                    name: 'Yara Greyjoy',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 4,
                                    religion_id: 2
                                },
                                {
                                    id: 13,
                                    name: 'Olenna Tyrell',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 3,
                                    religion_id: 2
                                },
                                {
                                    id: 14,
                                    name: 'Margaery Tyrell',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 4,
                                    religion_id: null
                                },
                                {
                                    id: 15,
                                    name: 'Oberyn Martell',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 2,
                                    religion_id: 4
                                },
                                {
                                    id: 16,
                                    name: 'Doran Martell',
                                    picture_url: 'pic',
                                    dead: false,
                                    house_id: 1,
                                    religion_id: 4
                                }]
                        })
                    })
            })
            it('GETs one person by id', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people/1')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        expect(res.body.people).to.be.an('object');
                        expect(res.body).to.eql({ people: { id: 1, name: 'Ned Stark', picture_url: 'pic', dead: true, house_id: 1, religion_id: 1 } })
                    })
            })
            it('responds with correct error if invalid id given to a GETs by id request', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people/17')
                    // supertest expect  - key on promise object
                    .expect(404)
                    .then(res => {
                        // chai expect
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.eql({ status: 404, err: `unable to find person with that id 17` })
                    })
            })
            it('POSTs a new person', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .post('/api/people')
                    .send({ name: 'Tom Baker', picture_url: 'pic', dead: false, house_id: 4, religion_id: 3 })
                    // supertest expect  - key on promise object
                    .expect(201)
                    .then(res => {
                        // chai expect

                        expect(res.body.new_person).to.be.an('object');
                        expect(res.body.new_person).to.eql({ name: 'Tom Baker', picture_url: 'pic', dead: false, house_id: 4, religion_id: 3, id: 17 })
                    })
            })

            it('GETs number of dead people using queries', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people/?dead=true')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        expect(res.body.people).to.be.an('array');
                        expect(res.body).to.eql({
                            people:
                                [{
                                    id: 1,
                                    name: 'Ned Stark',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 1,
                                    religion_id: 1
                                },
                                {
                                    id: 2,
                                    name: 'Catelyn Stark',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 1,
                                    religion_id: 2
                                },
                                {
                                    id: 5,
                                    name: 'Jon Snow',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 2,
                                    religion_id: 1
                                },

                                {
                                    id: 9,
                                    name: 'Viserys Targaryen',
                                    picture_url: null,
                                    dead: true,
                                    house_id: 3,
                                    religion_id: 1
                                },
                                {
                                    id: 10,
                                    name: 'Stannis Baratheon',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 4,
                                    religion_id: 4
                                },


                                {
                                    id: 15,
                                    name: 'Oberyn Martell',
                                    picture_url: 'pic',
                                    dead: true,
                                    house_id: 2,
                                    religion_id: 4
                                }]

                        });
                    })
            })
            it('GETs number of religions people using queries', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people/?religion=4')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        expect(res.body.people).to.be.an('array');
                        expect(res.body).to.eql(
                             {people: [{
                                id: 10,
                                name: 'Stannis Baratheon',
                                picture_url: 'pic',
                                dead: true,
                                house_id: 4,
                                religion_id: 4 },
                               {
                                id: 15,
                                name: 'Oberyn Martell',
                                picture_url: 'pic',
                                dead: true,
                                house_id: 2,
                                religion_id: 4 },
                               {
                                id: 16,
                                name: 'Doran Martell',
                                picture_url: 'pic',
                                dead: false,
                                house_id: 1,
                                religion_id: 4 }
                                ]} );
                    })

            })
            it('GETs number of religions and dead people using queries', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people?dead=true&religion=4')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        expect(res.body.people).to.be.an('array');
                        expect(res.body).to.eql(
                             {people: [{
                                id: 10,
                                name: 'Stannis Baratheon',
                                picture_url: 'pic',
                                dead: true,
                                house_id: 4,
                                religion_id: 4 },
                               {
                                id: 15,
                                name: 'Oberyn Martell',
                                picture_url: 'pic',
                                dead: true,
                                house_id: 2,
                                religion_id: 4 }
                                ]} );
                    })

            })

            it('PUTS status change on dead/alive person', () => {
                return request(app)
                .put('/api/people/1')
                .send({dead: false})
                .expect(201)
                .then(res => {
                    expect(res.body.new_data).to.be.an('object');
                        expect(res.body).to.eql({new_data: {id: 1, name: 'Ned Stark', picture_url: 'pic', dead: false, house_id: 1, religion_id: 1}});
                })
            })

            it('GETs all the people from a particular house', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/people?house=1')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        
                        expect(res.body.house).to.be.an('array');
                        res.body.house.forEach(function(item){
                            expect(item.house_id).to.equal(1);
                        })
                                
                    })

            })

            it('GETs all the religions', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .get('/api/religion')
                    // supertest expect  - key on promise object
                    .expect(200)
                    .then(res => {
                        // chai expect
                        
                        expect(res.body.religion).to.be.an('array');
                        
                            expect(res.body.religion.length).to.equal(4);
                            expect(res.body.religion[0].name).to.equal('Old Gods of the Forest')
                            expect(res.body.religion[0].type).to.equal('animistic')
                            expect(res.body.religion[0].god).to.equal(null)


                                
                    })

            })

            it('POSTs a new religion', () => {
                // runs mock server
                return request(app)
                    //get request to mock server
                    .post('/api/religion')
                    .send({ name: 'Awesomeness', type: 'me', god: 'matthew' })
                    // supertest expect  - key on promise object
                    .expect(201)
                    .then(res => {
                        // chai expect
                        expect(res.body.new_religion).to.be.an('object');
                        expect(res.body.new_religion).to.eql({ id: 5, name: 'Awesomeness', type: 'me', god: 'matthew' })
                    })
            })


        })
    })





});