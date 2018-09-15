

    
    const pgp = require('pg-promise')({promiseLib: Promise});

    const config = require(`./${process.env.NODE_ENV}.js`);





module.exports = pgp(config.db);