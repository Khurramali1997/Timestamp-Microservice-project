// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let date = new Date(req.params.date);
  let timestamp = parseInt(req.params.date);
  console.log(date);
  if (!req.params.date) {
    let unix = Date.now();
    let utc = new Date().toUTCString();
    res.json({ unix: unix, utc: utc });
  } else if (date.toString().includes(":")) {
    let unixDate = Date.parse(req.params.date);
    let utcDate = date.toUTCString();
    res.json({ unix: unixDate, utc: utcDate });
  } else if (timestamp) {
    let unix_date = timestamp;
    let utc_date = new Date(timestamp).toUTCString().toString();
    res.json({ unix: unix_date, utc: utc_date });
  } else if (date == "Invalid Date") {
    console.log("Invalid date condition met");
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
