module.exports = app => {
  const devicePlace = require("../controllers/device-place.controller");

  // Retrieve all places
  app.get("/device-places", devicePlace.findAll);

  // Retrieve all places with device_id
  app.get("/device-places/:device_id", devicePlace.findAllByDeviceId);

  // Retrieve a single place with label name and device_id
  app.get(
    "/device-places/:device_id/:label",
    devicePlace.findOneByDeviceIdAndLabel
  );

  // Update a single place with label name and device_id
  app.post("/device-places/:device_id/:label", devicePlace.findOneAndUpdate);
};
