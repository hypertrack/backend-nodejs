require("dotenv").config();
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");

var { updateAllDevices } = require("./common/devices");
var { updateAllTrips } = require("./common/trips");

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
require("./routes/trip.route")(app);
require("./routes/webhook.route")(app);
require("./routes/battery-status.route")(app);
require("./routes/device-status.route")(app);
require("./routes/trip-status.route")(app);
require("./routes/device-place.route")(app);
require("./routes/push-notification.route")(app);
require("./routes/device-push-info.route")(app);

// welcome URL for Heroku
app.get("/", (req, res) => res.send("HyperTrack Placeline Backend is RUNNING"));

// start server
http.listen(process.env.PORT || 8080, function() {
  console.log(`listening on *:${process.env.PORT || 8080}`);

  // update all devices in DB using HyperTrack API
  updateAllDevices();

  // update all trips in DB using HyperTrack API
  updateAllTrips();
});
