module.exports = app => {
  const devices = require("../controllers/device.controller");

  // Retrieve all devices
  app.get("/devices", devices.findAll);

  // Retrieve a single device with device_id
  app.get("/devices/:device_id", devices.findOne);
};
