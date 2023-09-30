// index.js
// where your node app starts

// init project
require('dotenv').config();
const request = require('request');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Declare a variable to store public ip address
let publicIp = ''
// Web for getting public IP Address 
const url = 'https://api.ipify.org/?format=json'

// Get server public address from url
request(url, (error, response, body) => {
  if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      // store the ip address value
      publicIp = data.ip;
  } else {
      console.error('Failed to fetch public IP address:', error);
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  res.json(
    {
      ipaddress: publicIp,
      language: language,
      software: software
    }
  );
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, process.env.ADDRESS || '127.0.0.1', function () {
  console.log(`Your app is listening on http://${listener.address().address}:${listener.address().port}`);
});
