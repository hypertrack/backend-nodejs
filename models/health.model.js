var mongoose = require("mongoose");

// Device schema
const HealthSchema = new mongoose.Schema(
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
    value: {
      type: String
    },
    hint: {
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
    collection: "Health"
  }
);

// index device_id
HealthSchema.index({
  device_id: 1
});

// update device health post save
HealthSchema.post("save", function(err, doc) {
  if (err) {
    throw err;
  }

  mongoose.model("Device").findOneAndUpdate(
    // filter: by device_id
    {
      device_id: doc.device_id
    },
    // update: health data
    {
      $set: {
        device_health: {
          data: {
            value: doc.value,
            hint: doc.hint
          },
          recorded_at: doc.recorded_at
        }
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  );
});

module.exports = mongoose.model("Health", HealthSchema);
