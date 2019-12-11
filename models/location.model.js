var mongoose = require("mongoose");

// Device schema
const LocationSchema = new mongoose.Schema(
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
    bearing: {
      type: Number
    },
    speed: {
      type: Number
    },
    accuracy: {
      type: Number
    },
    geometry: {
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
    collection: "Location"
  }
);

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
          speed: doc.speed,
          accuracy: doc.accuracy,
          bearing: doc.bearing,
          geometry: doc.geometry,
          recorded_at: doc.recorded_at
        }
      }
    }
  );

  next();
});

module.exports = mongoose.model("Location", LocationSchema);
