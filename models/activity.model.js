var mongoose = require("mongoose");

// Device schema
const ActivitySchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    recorded_at: {
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
        type: String,
        default: "Point"
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
    collection: "Activity"
  }
);

// index device_id
ActivitySchema.index(
  {
    device_id: 1,
    recorded_at: -1
  },
  { unique: true }
);

// update device activity post save
ActivitySchema.post("save", function(doc, next) {
  mongoose.model("Device").findOneAndUpdate(
    // filter: by device_id
    {
      device_id: doc.device_id
    },
    // update: activity data
    {
      $set: {
        activity: {
          data: {
            value: doc.value,
            location: doc.location
          },
          recorded_at: doc.recorded_at
        }
      }
    }
  );

  next();
});

module.exports = mongoose.model("Activity", ActivitySchema);
