var mongoose = require("mongoose");

// Trip status schema
const TripStatusSchema = new mongoose.Schema(
  {
    trip_id: {
      type: String,
      required: true
    },
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
    trip_metadata: {
      type: Object
    },
    summary: {
      type: Object
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
    collection: "TripStatus"
  }
);

// index trip_id
TripStatusSchema.index(
  {
    trip_id: 1,
    created_at: -1
  },
  { unique: true }
);

// update trip status post save
TripStatusSchema.post("save", function(doc, next) {
  mongoose.model("Trip").findOneAndUpdate(
    // filter: by trip_id
    {
      trip_id: doc.trip_id
    },
    // update: status data
    {
      $set: {
        status: doc.value === "completed" ? "completed" : "active",
        summary: doc.value === "completed" ? doc.summary : {}
      }
    }
  );

  next();
});

module.exports = mongoose.model("TripStatus", TripStatusSchema);
