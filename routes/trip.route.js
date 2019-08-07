module.exports = app => {
  const trips = require("../controllers/trip.controller");

  // Create a new trip
  app.post("/trips", trips.create);

  // Retrieve all trip
  app.get("/trips", trips.findAll);

  // Retrieve a single trip with trip_id
  app.get("/trips/:trip_id", trips.findOne);

  // Update trip using trip_id
  app.post("/trips/:trip_id", trips.findOneAndUpdate);
};
