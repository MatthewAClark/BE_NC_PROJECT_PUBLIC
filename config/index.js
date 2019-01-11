

const pgp = require('pg-promise')({promiseLib: Promise});


const config = {
    db: process.env.DATABASE_URL
  
  };


//const config = require(`./${process.env.NODE_ENV}.js`);




module.exports = pgp(config.db);