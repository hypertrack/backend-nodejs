const Summary = require('../models/summary.model');
const Location = require('../models/location.model');
const Activity = require('../models/activity.model');
const Health = require('../models/health.model');

// Add summary
exports.addSummary = (obj) => {
    Summary
        .create({
            recorded_at: obj.recorded_at,
            device_id: obj.device_id,
            distance: obj.data.distance,
            steps: obj.data.steps,
            duration: obj.data.duration,
            start_datetime: obj.data.start_datetime,
            end_datetime: obj.data.end_datetime,
            segments: obj.data.segments
        })
        .then(() => {
            res.status(201).send('Webhook: Summary created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Webhook: Error creating summary: " + req.body
            });
        });
};

// Add location update
exports.addLocation = (obj) => {
    Location
        .create({
            recorded_at: obj.recorded_at,
            device_id: obj.device_id,
            altitude: obj.data.altitude,
            bearing: obj.data.bearing,
            speed: obj.data.speed,
            location_accuracy: obj.data.location_accuracy,
            location: obj.data.location
        })
        .then(() => {
            res.status(201).send('Webhook: Location update created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Webhook: Error creating location update: " + req.body
            });
        });
};

// Add activity update
exports.addActivity = (obj) => {
    Activity
        .create({
            recorded_at: obj.recorded_at,
            device_id: obj.device_id,
            value: obj.data.value,
            location: obj.data.location
        })
        .then(() => {
            res.status(201).send('Webhook: Activity update created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Webhook: Error creating activity update: " + req.body
            });
        });
};

// Add health update
exports.addHealth = (obj) => {
    Health
        .create({
            recorded_at: obj.recorded_at,
            device_id: obj.device_id,
            value: obj.data.value,
            hint: obj.data.hint
        })
        .then(() => {
            res.status(201).send('Webhook: Health update created successfully');
        })
        .catch(() => {
            return res.status(500).send({
                message: "Webhook: Error creating health update: " + req.body
            });
        });
};