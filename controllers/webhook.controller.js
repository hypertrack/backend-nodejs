const Location = require("../models/location.model");
const DeviceStatus = require("../models/device-status.model");
const BatteryStatus = require("../models/battery-status.model");
const TripStatus = require("../models/trip-status.model");

// Add location update
exports.addLocation = obj => {
  Location.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    bearing: obj.data.bearing,
    speed: obj.data.speed,
    accuracy: obj.data.accuracy,
    geometry: obj.data.geometry,
    version: obj.version
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
    reason: obj.data.reason,
    location: obj.location,
    version: obj.version
  });
};

// Add battery status update
exports.addBatteryStatus = obj => {
  BatteryStatus.create({
    recorded_at: obj.recorded_at,
    created_at: obj.created_at,
    device_id: obj.device_id,
    value: obj.data.value,
    location: obj.location,
    version: obj.version
  });
};

// Add trip status update
exports.addTripStatus = obj => {
  TripStatus.create({
    created_at: obj.created_at,
    device_id: obj.device_id,
    trip_id: obj.data.trip_id,
    value: obj.data.value,
    trip_metadata: obj.data.trip_metadata,
    geofence_metadata: obj.data.geofence_metadata,
    summary: obj.data.summary,
    version: obj.version
  });
};
