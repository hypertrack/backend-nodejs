var mongoose = require("mongoose");

// Battery status schema
const BatteryStatusSchema = new mongoose.Schema(
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
    collection: "BatteryStatus"
  }
);

// update device status post save
BatteryStatusSchema.post("save", function(doc, next) {
  mongoose.model("Device").findOneAndUpdate(
    // filter: by device_id
    {
      device_id: doc.device_id
    },
    // update: statu data
    {
      $set: {
        battery: doc.value
      }
    }
  );

  next();
});

module.exports = mongoose.model("BatteryStatus", BatteryStatusSchema);
