var mongoose = require("mongoose");

// Device push info schema
const DevicePushInfoSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    app_name: {
      type: String,
      required: true
    },
    platform: {
      type: String,
      required: true
    },
    push_token: {
      type: String,
      required: true
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
    collection: "DevicePushInfo"
  }
);

// index device_id
DevicePushInfoSchema.index(
  {
    device_id: 1
  },
  { unique: true }
);

module.exports = mongoose.model("DevicePushInfo", DevicePushInfoSchema);
