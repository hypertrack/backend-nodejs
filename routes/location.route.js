module.exports = app => {
  const locations = require("../controllers/location.controller");

  // Retrieve all location updates
  app.get("/locations", locations.findAll);

  // Add a new location update
  app.post("/locations", locations.addOne);

  // Retrieve all locations for a device_id
  app.get("/locations/:device_id", locations.findAllByDeviceId);

  // Retrieve last location for a device_id
  app.get("/locations/:device_id/last", locations.findLastByDeviceId);
};
