module.exports = app => {
  const deviceStatus = require("../controllers/device-status.controller");

  // Retrieve all device status updates
  app.get("/device-status", deviceStatus.findAll);

  // Add a new device status update
  app.post("/device-status", deviceStatus.addOne);

  // Retrieve all device status updates for a device_id
  app.get("/device-status/:device_id", deviceStatus.findAllByDeviceId);

  // Retrieve last device statsu update for a device_id
  app.get("/device-status/:device_id/last", deviceStatus.findLastByDeviceId);
};
