const DeviceStatus = require("../models/device-status.model");

// Retrieve all device status updates
exports.findAll = (req, res) => {
  DeviceStatus.find()
    .sort({
      recorded_at: 1
    })
    .then(deviceStatus => {
      res.send(deviceStatus);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving device status updates."
      });
    });
};

// Add a new device status update
exports.addOne = (req, res) => {
  DeviceStatus.create(req.body)
    .then(() => {
      res.status(201).send("Device status update created successfully");
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error creating device status update: " + req.body
      });
    });
};

// Find all device status updates for a device_id
exports.findAllByDeviceId = (req, res) => {
  DeviceStatus.find({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(deviceStatus => {
      if (!deviceStatus) {
        return res.status(404).send({
          message:
            "Device status updates not found for device id: " +
            req.params.device_id
        });
      }
      res.send(deviceStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Device status updates not found for device id: " +
            req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving device status updates for device id: " +
          req.params.device_id
      });
    });
};

// Find the last device status update for a device_id
exports.findLastByDeviceId = (req, res) => {
  DeviceStatus.findOne({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(deviceStatus => {
      if (!deviceStatus) {
        return res.status(404).send({
          message:
            "No last device status update found for device id: " +
            req.params.device_id
        });
      }
      res.send(deviceStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "No last device status update found for device id: " +
            req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving last device status update for device id: " +
          req.params.device_id
      });
    });
};
