require("dotenv").config();
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var request = require("request");

// setup express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));
app.use(cors());

// setup socket.io
app.use(function(req, res, next) {
  res.io = io;
  next();
});

// setup Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

mongoose.set("debug", process.env.NODE_ENV !== "production");

// add routes
require("./routes/device.route")(app);
require("./routes/location.route")(app);
require("./routes/summary.route")(app);
require("./routes/webhook.route")(app);

// welcome URL for Heroku
app.get("/welcome", (req, res) => res.send("Hello from HyperTrack!"));

// start server
http.listen(process.env.PORT || 8080, function() {
  console.log(`listening on *:${process.env.PORT || 8080}`);

  // update all devices in DB using HyperTrack API
  const base64auth = Buffer.from(
    `${process.env.HT_ACCOUNT_ID}:${process.env.HT_SECRET_KEY}`
  ).toString("base64");
  const auth = `Basic ${base64auth}`;
  const options = {
    url: "https://v3.api.hypertrack.com/live",
    headers: {
      Authorization: auth
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const devices = JSON.parse(body);
      let bulkOps = [];

      // update all devices in mongoDB
      var deviceCollection = require("./models/device.model");

      devices.forEach(device => {
        let upsertDoc = {
          updateOne: {
            filter: { device_id: device["device_id"] },
            update: device,
            upsert: true,
            setDefaultsOnInsert: true
          }
        };
        bulkOps.push(upsertDoc);
      });

      deviceCollection.bulkWrite(bulkOps);
    }
  });
});
