// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  currentDate = new Date();

  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

app.get("/api/:date", function(req, res) {
  var theDate = new Date(req.params.date)
  var unix, utc, response;

  if (theDate == "Invalid Date") {
    unix = parseInt(req.params.date);
    utc = new Date(unix);

    if (utc != "Invalid Date") {

      response = {
        unix: unix,
        utc: utc.toUTCString()
      }
    }
    else {
      response = {error: "Invalid Date"};
    }
  }
  else {
    response = {
      unix: theDate.getTime(),
      utc: theDate.toUTCString()
    };
  }

  res.json(response);
});

// listen for requests :)
// var listener = app.listen(5000, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
