var mongoose = require("mongoose");

// Device status schema
const DeviceStatusSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    recorded_at: {
      type: Date
    },
    created_at: {
      type: Date,
      required: true
    },
    value: {
      type: String
    },
    activity: {
      type: String
    },
    reason: {
      type: String
    },
    location: {
      coordinates: {
        type: [Number]
      },
      type: {
        type: String
      }
    },
    version: {
      type: String
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
    collection: "DeviceStatus"
  }
);

// update device status post save
DeviceStatusSchema.post("save", function(doc, next) {
  mongoose.model("Device").findOneAndUpdate(
    // filter: by device_id
    {
      device_id: doc.device_id
    },
    // update: statu data
    {
      $set: {
        device_status: {
          data: {
            recorded_at: doc.recorded_at,
            activity: doc.activity,
            reason: doc.reason
          },
          value: doc.value
        }
      }
    }
  );

  next();
});

module.exports = mongoose.model("DeviceStatus", DeviceStatusSchema);
