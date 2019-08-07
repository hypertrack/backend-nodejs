const Trip = require("../models/trip.model");

// Create a new trip
exports.create = (req, res) => {
  const newTrip = new Trip(req.body);
  newTrip.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newTrip);
  });
};

// Retrieve and return all trips from the database.
exports.findAll = (req, res) => {
  Trip.find()
    .then(trips => {
      res.send(trips);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving trips."
      });
    });
};

// Find a single trip with a trip_id
exports.findOne = (req, res) => {
  Trip.findOne({ trip_id: req.params.trip_id })
    .then(trip => {
      if (!trip) {
        return res.status(404).send({
          message: "Trip not found with id " + req.params.trip_id
        });
      }
      res.send(trip);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Trip not found with id " + req.params.trip_id
        });
      }
      return res.status(500).send({
        message: "Error retrieving trip with id " + req.params.trip_id
      });
    });
};

// Update a trip using trip_id (e.g. after complete)
exports.findOneAndUpdate = (req, res) => {
  Trip.findOneAndUpdate({ trip_id: req.params.trip_id }, req.body)
    .then(trip => {
      res.send(trip);
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while updating trip with id ${
          req.params.trip_id
        }. Reason: ${err.message}`
      });
    });
};
