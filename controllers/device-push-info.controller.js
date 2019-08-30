const DevicePushInfo = require("../models/device-push-info.model");

// Retrieve and return all device push info from the database
exports.findAll = (req, res) => {
  DevicePushInfo.find()
    .then(pushInfo => {
      res.send(pushInfo);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving device push info."
      });
    });
};

// Find a single device push info with a device_id
exports.findOne = (req, res) => {
  DevicePushInfo.findOne({ device_id: req.params.device_id })
    .then(pushInfo => {
      if (!pushInfo) {
        return res.status(404).send({
          message: "Device push info not found with id " + req.params.device_id
        });
      }
      res.send(device);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Device push info not found with id " + req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving device push info with id " + req.params.device_id
      });
    });
};

// Remove a single device push info using device_id
exports.deleteOne = (req, res) => {
  DevicePushInfo.deleteOne({ device_id: req.params.device_id })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: `Device push info with id ${
          req.params.device_id
        } could not be removed. Reason: ${err.message}`
      });
    });
};
