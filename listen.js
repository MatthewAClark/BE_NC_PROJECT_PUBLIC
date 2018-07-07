const app = require('./server.js')
const PORT = 3000;

// Turn on the server
//
app.listen(PORT, function (err) {
    if(err) throw(err);
    console.log(`App listening on port ${PORT}`);
  });
