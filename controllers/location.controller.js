const Location = require("../models/location.model");

// Retrieve all locations
exports.findAll = (req, res) => {
  Location.find()
    .sort({
      recorded_at: 1
    })
    .then(locations => {
      res.send(locations);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    });
};

// Add a new location update
exports.addOne = (req, res) => {
  Location.create(req.body)
    .then(() => {
      res.status(201).send("Location update created successfully");
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error creating location update: " + req.body
      });
    });
};

// Find all locations for a device_id
exports.findAllByDeviceId = (req, res) => {
  Location.find({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(locations => {
      if (!locations) {
        return res.status(404).send({
          message:
            "Location updates not found for device id: " + req.params.device_id
        });
      }
      res.send(locations);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Location updates not found for device id: " + req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving location updates for device id: " +
          req.params.device_id
      });
    });
};

// Find the last location for a device_id
exports.findLastByDeviceId = (req, res) => {
  Location.findOne({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message:
            "No last location found for device id: " + req.params.device_id
        });
      }
      res.send(location);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "No last location found for device id: " + req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving last location for device id: " +
          req.params.device_id
      });
    });
};
