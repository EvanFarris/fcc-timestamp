// index.js
// where your node app starts
require('dotenv').config();
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

app.get("/api/:date", function(req, res){
  let paramsDateString = req.params.date;
  let unix, utc, pDate;
  let tDate= new Date(req.params.date);

  const regex1 = /^-?\d{1,}$/;
  const regex2 = /^\d\d\d\d-\d\d-\d\d$/

  if(paramsDateString.match(regex1)){
    let paramsDateInt = parseInt(paramsDateString);
    pDate = new Date(value=paramsDateInt);
  } else {
    pDate = new Date(paramsDateString);
    if(pDate == "Invalid Date") {
      res.json({error: "Invalid Date"});
      return;
    } 
  }

  unix = pDate.getTime();
  utc = pDate.toUTCString();
  res.json({unix: unix, utc: utc});  
});
  
app.get("/api", function(req,res) {
  const date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()});
}); 

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
