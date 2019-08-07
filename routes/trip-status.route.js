module.exports = app => {
  const tripStatus = require("../controllers/trip-status.controller");

  // Retrieve all trip status updates
  app.get("/trip-status", tripStatus.findAll);

  // Add a new trip status update
  app.post("/trip-status", tripStatus.addOne);

  // Retrieve all trip status updates for a trip_id
  app.get("/trip-status/:trip_id", tripStatus.findAllByTripId);

  // Retrieve last trip status update for a trip_id
  app.get("/trip-status/:trip_id/last", tripStatus.findLastByTripId);
};
