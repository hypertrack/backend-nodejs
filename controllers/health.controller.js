const Health = require('../models/health.model');

// Retrieve all health updates
exports.findAll = (req, res) => {
    Health
        .find()
        .sort({
            recorded_at: 1
        })
        .then(health => {
            res.send(health);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving health updates."
            });
        });
};

// Add a new health update
exports.addOne = (req, res) => {
    Health
        .create(req.body)
        .then(() => {
            res.status(201).send('Health update created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Error creating health update: " + req.body
            });
        });
};

// Find all health updates for a device_id
exports.findAllByDeviceId = (req, res) => {
    Health
        .find({
            device_id: req.params.device_id
        })
        .sort({
            recorded_at: 1
        })
        .then(health => {
            if (!health) {
                return res.status(404).send({
                    message: "Health updates not found for device id: " + req.params.device_id
                });
            }
            res.send(health);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Health updates not found for device id: " + req.params.device_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving health updates for device id: " + req.params.device_id
            });
        });
};

// Find the last health update for a device_id
exports.findLastByDeviceId = (req, res) => {
    Health
        .findOne({
            device_id: req.params.device_id
        })
        .sort({
            recorded_at: 1
        })
        .then(health => {
            if (!health) {
                return res.status(404).send({
                    message: "No last health update found for device id: " + req.params.device_id
                });
            }
            res.send(health);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No last health update found for device id: " + req.params.device_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving last health update for device id: " + req.params.device_id
            });
        });
};