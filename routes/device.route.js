module.exports = app => {
  const devices = require("../controllers/device.controller");
  const trips = require("../controllers/trip.controller");

  // Retrieve all devices
  app.get("/devices", devices.findAll);

  // Retrieve a single device with device_id
  app.get("/devices/:device_id", devices.findOne);

  // Remove device using device_id
  app.delete("/devices/:device_id", devices.deleteOne);

  // Retrieve all trips for a device using device_id
  app.get("/devices/:device_id/trips", trips.findAllForDevice);
};
