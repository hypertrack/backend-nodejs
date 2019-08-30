var mongoose = require("mongoose");

// Push notification schema
const PushNotificationSchema = new mongoose.Schema(
  {
    ids: {
      type: Array,
      required: true
    },
    payload: {
      type: Object,
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
    collection: "PushNotification"
  }
);

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
