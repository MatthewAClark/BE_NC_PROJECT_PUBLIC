

    
    const pgp = require('pg-promise')({promiseLib: Promise});

    const config = require(`./${process.env.NODE_ENV}.js`);




console.log(config)
module.exports = pgp(config.db);