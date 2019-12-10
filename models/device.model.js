var mongoose = require("mongoose");

// Device schema
const DeviceSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    location: {
      speed: {
        type: Number
      },
      accuracy: {
        type: Number
      },
      bearing: {
        type: Number
      },
      geometry: {
        type: {
          type: String
        },
        coordinates: {
          type: [Number]
        }
      },
      recorded_at: {
        type: Date,
        required: true
      }
    },
    device_status: {
      data: {
        recorded_at: {
          type: Date
        },
        activity: {
          type: String
        },
        reason: {
          type: String
        }
      },
      value: {
        type: String
      }
    },
    views: {
      share_url: {
        type: String
      },
      embed_url: {
        type: String
      }
    },
    battery: {
      type: String
    },
    device_info: {
      os_name: {
        type: String
      },
      timezone: {
        type: String
      },
      device_brand: {
        type: String
      },
      sdk_version: {
        type: String
      },
      device_model: {
        type: String
      },
      network_operator: {
        type: String
      },
      name: {
        type: String
      },
      os_version: {
        type: String
      }
    },
    name: {
      type: String
    },
    metadata: {
      type: Object
    },
    registered_at: {
      type: Date
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
    collection: "Device"
  }
);

// index device_id
DeviceSchema.index(
  {
    device_id: 1
  },
  { unique: true }
);

module.exports = mongoose.model("Device", DeviceSchema);
