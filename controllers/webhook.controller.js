const Summary = require("../models/summary.model");
const Location = require("../models/location.model");
const DeviceStatus = require("../models/device-status.model");
const BatteryStatus = require("../models/battery-status.model");
const TripStatus = require("../models/trip-status.model");

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

// Add device status update
exports.addDeviceStatus = obj => {
  DeviceStatus.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    value: obj.data.value,
    activity: obj.data.activity,
    reason: obj.data.reason
  });
};

// Add battery status update
exports.addBatteryStatus = obj => {
  BatteryStatus.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    value: obj.data.value
  });
};

// Add battery status update
exports.addTripStatus = obj => {
  TripStatus.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    trip_id: obj.data.trip_id,
    value: obj.data.value,
    trip_metadata: obj.data.trip_metadata,
    summary: obj.data.summary
  });
};
