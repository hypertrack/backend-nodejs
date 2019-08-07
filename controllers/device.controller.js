const Device = require("../models/device.model");

// Retrieve and return all devices from the database.
exports.findAll = (req, res) => {
  Device.find()
    .then(devices => {
      res.send(devices);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving devices."
      });
    });
};

// Find a single device with a device_id
exports.findOne = (req, res) => {
  Device.findOne({ device_id: req.params.device_id })
    .then(device => {
      if (!device) {
        return res.status(404).send({
          message: "Device not found with id " + req.params.device_id
        });
      }
      res.send(device);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Device not found with id " + req.params.device_id
        });
      }
      return res.status(500).send({
        message: "Error retrieving device with id " + req.params.device_id
      });
    });
};

// Remove a single device using device_id
exports.deleteOne = (req, res) => {
  Device.deleteOne({ device_id: req.params.device_id })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: `Device with id ${
          req.params.device_id
        } could not be removed. Reason: ${err.message}`
      });
    });
};
