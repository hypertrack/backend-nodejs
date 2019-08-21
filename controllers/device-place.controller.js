const DevicePlace = require("../models/device-place.model");

// Retrieve all places
exports.findAll = (req, res) => {
  DevicePlace.find()
    .then(places => {
      if (!places) {
        return res.status(404).send({
          message: "Places not found for any device"
        });
      }
      res.send(places);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Places not found for any device"
        });
      }
      return res.status(500).send({
        message: "Error retrieving places for any device"
      });
    });
};

// Retrieve all places with device_id
exports.findAllByDeviceId = (req, res) => {
  DevicePlace.find({ device_id: req.params.device_id })
    .then(places => {
      if (!places) {
        return res.status(404).send({
          message: "Places not found for device id " + req.params.device_id
        });
      }
      res.send(places);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Places not found for device id " + req.params.device_id
        });
      }
      return res.status(500).send({
        message: "Error retrieving places for device id " + req.params.device_id
      });
    });
};

// Retrieve a single place with label name and device_id
exports.findOneByDeviceIdAndLabel = (req, res) => {
  DevicePlace.find({ device_id: req.params.device_id, label: req.params.label })
    .then(place => {
      if (!place) {
        return res.status(404).send({
          message: `Place "${req.params.label}" not found for device id ${
            req.params.device_id
          }`
        });
      }
      res.send(place);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Place "${req.params.label}" not found for device id ${
            req.params.device_id
          }`
        });
      }
      return res.status(500).send({
        message: `Error retrieving place "${req.params.label}" for device id ${
          req.params.device_id
        }`
      });
    });
};

// Update a single place with label name and device_id
exports.findOneAndUpdate = (req, res) => {
  DevicePlace.findOneAndUpdate(
    { device_id: req.params.device_id, label: req.params.label },
    {
      $set: {
        address: req.body.address,
        coordinates: req.body.coordinates
      }
    },
    { upsert: true, new: true }
  )
    .then(place => {
      res.send(place);
    })
    .catch(err => {
      res.status(500).send({
        message: `Some error occurred while updating place ${
          req.params.label
        }. Reason: ${err.message}`
      });
    });
};
