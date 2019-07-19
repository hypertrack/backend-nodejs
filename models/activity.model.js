var mongoose = require('mongoose');

// Device schema
const ActivitySchema = new mongoose.Schema({
    "device_id": {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    "recorded_at": {
        type: Date,
        required: true
    },
    "value": {
        type: String
    },
    "location": {
        "coordinates": {
            type: [Number]
        },
        "type": {
            type: String,
            default: "Point"
        }
    },
    "updatedAt": {
        type: Date
    },
    "createdAt": {
        type: Date
    }
}, {
    // enable timestamps
    timestamps: true,
    // set collection name
    collection: 'Activity'
});

// index device_id
ActivitySchema.index({
    device_id: 1
});

// update device activity post save
ActivitySchema.post('save', function(doc) {
    mongoose.model('Device').findOneAndUpdate(
        // filter: by device_id
        {
            device_id: doc.device_id
        },
        // update: activity data
        {
            activity: {
                data: {
                    value: doc.value,
                    location: doc.location,
                },
                recorded_at: doc.recorded_at
            }
        });
  });

module.exports = mongoose.model('Activity', ActivitySchema);