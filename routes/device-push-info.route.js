module.exports = app => {
  const devicePushInfo = require("../controllers/device-push-info.controller");

  // Retrieve all device push infos
  app.get("/device-push-info", devicePushInfo.findAll);

  // Retrieve a single device push info with device_id
  app.get("/device-push-info/:device_id", devicePushInfo.findOne);

  // Remove device push info using device_id
  app.delete("/device-push-info/:device_id", devicePushInfo.deleteOne);
};
