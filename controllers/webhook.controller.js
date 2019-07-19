const summaries = require('./summary.controller');
const locations = require('./location.controller');
const activities = require('./activity.controller');
const health = require('./health.controller');

// Add summary
exports.addSummary = (obj) => {
    summaries.addOne({
        recorded_at: obj.recorded_at,
        device_id: obj.device_id,
        distance: obj.data.distance,
        steps: obj.data.steps,
        duration: obj.data.duration,
        start_datetime: obj.data.start_datetime,
        end_datetime: obj.data.end_datetime,
        segments: obj.data.segments
    });
};

// Add location update
exports.addLocation = (obj) => {
    locations.addOne({
        recorded_at: obj.recorded_at,
        device_id: obj.device_id,
        altitude: obj.data.altitude,
        bearing: obj.data.bearing,
        speed: obj.data.speed,
        location_accuracy: obj.data.location_accuracy,
        location: obj.data.location
    });
};

// Add activity update
exports.addActivity = (obj) => {
    activities.addOne({
        recorded_at: obj.recorded_at,
        device_id: obj.device_id,
        value: obj.data.value,
        location: obj.data.location
    });
};

// Add health update
exports.addHealth = (obj) => {
    health.addOne({
        recorded_at: obj.recorded_at,
        device_id: obj.device_id,
        value: obj.data.value,
        hint: obj.data.hint
    });
};