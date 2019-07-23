const Summary = require("../models/summary.model");

// Retrieve all summaries
exports.findAll = (req, res) => {
  Summary.find()
    .sort({
      recorded_at: 1
    })
    .then(summaries => {
      res.send(summaries);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving summaries."
      });
    });
};

// Add a new summary
exports.addOne = (req, res) => {
  Summary.create(req.body)
    .then(() => {
      res.status(201).send("Summary created successfully");
    })
    .catch(() => {
      return res.status(500).send({
        message: "Error creating summary: " + req.body
      });
    });
};

// Find all summaries for a device_id
exports.findAllByDeviceId = (req, res) => {
  Summary.find({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(summaries => {
      if (!summaries) {
        return res.status(404).send({
          message: "Summaries not found for device id: " + req.params.device_id
        });
      }
      res.send(summaries);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Summaries not found for device id: " + req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving summaries for device id: " + req.params.device_id
      });
    });
};

// Find the last summary for a device_id
exports.findLastByDeviceId = (req, res) => {
  Summary.findOne({
    device_id: req.params.device_id
  })
    .sort({
      recorded_at: 1
    })
    .then(summary => {
      if (!summary) {
        return res.status(404).send({
          message:
            "No last summary found for device id: " + req.params.device_id
        });
      }
      res.send(summary);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "No last summary found for device id: " + req.params.device_id
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving last summary for device id: " + req.params.device_id
      });
    });
};
