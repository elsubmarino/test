// index.js
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

app.get("/api", (req, res) => {
  const date = new Date();
  const json = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
  res.json(json);
});

app.get("/api/:val", (req, res) => {
  const { val } = req.params;
  console.log(val);
  if (val === "") val = new Date().getTime();
  const pattern = /^(\d{4}-\d{2}-\d{2}$)|(^\d{13}$)/;
  const result = pattern.exec(val);
  if (result) {
    const date = new Date(result[2] ? Number(result[2]) : result[1]);
    const json = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
    res.json(json);
  } else {
    res.json({
      error: "Invalid Date",
    });
  }

  //console.log(req.params.val);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
