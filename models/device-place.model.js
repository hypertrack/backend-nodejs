var mongoose = require("mongoose");

// Device Place schema
const DevicePlaceSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    address: {
      type: String
    },
    coordinates: {
      lat: {
        type: Number
      },
      lng: {
        type: Number
      }
    },
    updatedAt: {
      type: Date
    },
    createdAt: {
      type: Date
    }
  },
  {
    // enable timestamps
    timestamps: true,
    // set collection name
    collection: "DevicePlace"
  }
);

// index device_id and label
DevicePlaceSchema.index(
  {
    device_id: 1,
    label: -1
  },
  { unique: true }
);

module.exports = mongoose.model("DevicePlace", DevicePlaceSchema);
