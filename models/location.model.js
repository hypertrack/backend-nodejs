var mongoose = require("mongoose");

// Device schema
const LocationSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      index: true,
      required: true
    },
    recorded_at: {
      type: Date,
      required: true
    },
    altitude: {
      type: Number
    },
    bearing: {
      type: Number
    },
    speed: {
      type: Number
    },
    location_accuracy: {
      type: Number
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
    collection: "Location"
  }
);

// index device_id
LocationSchema.index({
  device_id: 1
});

// update device location post save
LocationSchema.post("save", function(doc, next) {
  mongoose.model("Device").findOneAndUpdate(
    // filter: by device_id
    {
      device_id: doc.device_id
    },
    // update: location data
    {
      $set: {
        location: {
          data: {
            speed: doc.speed,
            altitude: doc.altitude,
            location_accuracy: doc.location_accuracy,
            bearing: doc.bearing,
            location: doc.location
          },
          recorded_at: doc.recorded_at
        }
      }
    }
  );

  next();
});

module.exports = mongoose.model("Location", LocationSchema);
