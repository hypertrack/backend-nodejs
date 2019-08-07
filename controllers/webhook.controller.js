const Summary = require("../models/summary.model");
const Location = require("../models/location.model");
const Activity = require("../models/activity.model");
const Health = require("../models/health.model");

// Add summary
exports.addSummary = obj => {
  Summary.create({
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
exports.addLocation = obj => {
  Location.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    bearing: obj.data.bearing,
    speed: obj.data.speed,
    accuracy: obj.data.accuracy,
    geometry: obj.data.geometry
  });
};

// Add activity update
exports.addActivity = obj => {
  Activity.create({
    recorded_at: obj.recorded_at,
    device_id: obj.device_id,
    value: obj.data.value,
    location: obj.data.location
  });
};

// Add health update
exports.addHealth = obj => {
  Health.create({
    recorded_at: obj.recorded_at,
    device_id: obj.device_id,
    value: obj.data.value,
    hint: obj.data.hint
  });
};
