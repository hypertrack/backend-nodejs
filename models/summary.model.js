var mongoose = require("mongoose");

// Device schema
const SummarySchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true
    },
    recorded_at: {
      type: Date
      // required: true
      // TODO: Summaries don't have recorded_at ??
    },
    distance: {
      type: Number
    },
    steps: {
      type: Number
    },
    duration: {
      type: Number
    },
    start_datetime: {
      type: Date
    },
    end_datetime: {
      type: Date
    },
    segments: {
      type: [Object]
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
    collection: "Summary"
  }
);

// index device_id
SummarySchema.index(
  {
    device_id: 1,
    recorded_at: -1
  },
  { unique: true }
);

module.exports = mongoose.model("Summary", SummarySchema);
