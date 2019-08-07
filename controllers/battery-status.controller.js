const BatteryStatus = require("../models/battery-status.model");

// Retrieve all battery status updates
exports.findAll = (req, res) => {
  BatteryStatus.find()
    .sort({
      recorded_at: 1
    })
    .then(batteryStatus => {
      res.send(batteryStatus);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving battery status updates."
      });
    });
};

// Add a new battery status update
exports.addOne = (req, res) => {
  BatteryStatus.create(req.body)
    .then(() => {
      res.status(201).send("Battery status update created successfully");
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error creating battery status update: " + req.body
      });
    });
};

// Find all battery status updates for a device_id
exports.findAllByDeviceId = (req, res) => {
  BatteryStatus.find({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(batteryStatus => {
      if (!batteryStatus) {
        return res.status(404).send({
          message:
            "Battery status updates not found for device id: " +
            req.params.device_id
        });
      }
      res.send(batteryStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Battery status updates not found for device id: " +
            req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving battery status updates for device id: " +
          req.params.device_id
      });
    });
};

// Find the last battery status update for a device_id
exports.findLastByDeviceId = (req, res) => {
  BatteryStatus.findOne({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(batteryStatus => {
      if (!batteryStatus) {
        return res.status(404).send({
          message:
            "No last battery status update found for device id: " +
            req.params.device_id
        });
      }
      res.send(batteryStatus);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "No last battery status update found for device id: " +
            req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving last battery status update for device id: " +
          req.params.device_id
      });
    });
};
