const TripStatus = require("../models/trip-status.model");

// Retrieve all trip status updates
exports.findAll = (req, res) => {
  TripStatus.find()
    .sort({
      recorded_at: 1
    })
    .then(tripStatus => {
      res.send(tripStatus);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving trip status updates."
      });
    });
};

// Add a new trip status update
exports.addOne = (req, res) => {
  TripStatus.create(req.body)
    .then(() => {
      res.status(201).send("Trip status update created successfully");
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error creating trip status update: " + req.body
      });
    });
};

// Find all trip status updates for a trip_id
exports.findAllByTripId = (req, res) => {
  TripStatus.find({
    trip_id: req.params.trip_id
  })
    .sort({
      recorded_at: 1
    })
    .then(tripStatus => {
      if (!tripStatus) {
        return res.status(404).send({
          message:
            "Trip status updates not found for trip id: " + req.params.trip_id
        });
      }
      res.send(tripStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Trip status updates not found for trip id: " + req.params.trip_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving trip status updates for trip id: " +
          req.params.trip_id
      });
    });
};

// Find the last trip status update for a trip_id
exports.findLastByTripId = (req, res) => {
  TripStatus.findOne({
    trip_id: req.params.trip_id
  })
    .sort({
      recorded_at: 1
    })
    .then(tripStatus => {
      if (!tripStatus) {
        return res.status(404).send({
          message:
            "No last trip status update found for trip id: " +
            req.params.trip_id
        });
      }
      res.send(tripStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "No last trip status update found for trip id: " +
            req.params.trip_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving last trip status update for trip id: " +
          req.params.trip_id
      });
    });
};
