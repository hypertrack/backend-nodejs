module.exports = app => {
  const batteryStatus = require("../controllers/battery-status.controller");

  // Retrieve all battery status updates
  app.get("/battery-status", batteryStatus.findAll);

  // Add a new battery status update
  app.post("/battery-status", batteryStatus.addOne);

  // Retrieve all battery status updates for a device_id
  app.get("/battery-status/:device_id", batteryStatus.findAllByDeviceId);

  // Retrieve last battery status update for a device_id
  app.get("/battery-status/:device_id/last", batteryStatus.findLastByDeviceId);
};
