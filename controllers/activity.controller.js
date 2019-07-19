const Activity = require('../models/activity.model');

// Retrieve all activities
exports.findAll = (req, res) => {
    Activity
        .find()
        .sort({
            recorded_at: 1
        })
        .then(activities => {
            res.send(activities);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving activities."
            });
        });
};

// Add a new activity update
exports.addOne = (req, res) => {
    Activity
        .create(req.body)
        .then(() => {
            res.status(201).send('Activity update created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Error creating activity update: " + req.body
            });
        });
};

// Find all activity updates for a device_id
exports.findAllByDeviceId = (req, res) => {
    Activity
        .find({
            device_id: req.params.device_id
        })
        .sort({
            recorded_at: 1
        })
        .then(activities => {
            if (!activities) {
                return res.status(404).send({
                    message: "Activity updates not found for device id: " + req.params.device_id
                });
            }
            res.send(activities);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Activity updates not found for device id: " + req.params.device_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving activity updates for device id: " + req.params.device_id
            });
        });
};

// Find the last activity for a device_id
exports.findLastByDeviceId = (req, res) => {
    Activity
        .findOne({
            device_id: req.params.device_id
        })
        .sort({
            recorded_at: 1
        })
        .then(activity => {
            if (!activity) {
                return res.status(404).send({
                    message: "No last activity found for device id: " + req.params.device_id
                });
            }
            res.send(activity);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No last activity found for device id: " + req.params.device_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving last activity for device id: " + req.params.device_id
            });
        });
};