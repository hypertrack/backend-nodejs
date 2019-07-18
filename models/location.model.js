var mongoose = require('mongoose');

// Device schema
const LocationSchema = new mongoose.Schema({
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
    "altitude": {
        type: Number
    },
    "bearing": {
        type: Number
    },
    "speed": {
        type: Number
    },
    "location_accuracy": {
        type: Number
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
    collection: 'Location'
});

// index device_id
LocationSchema.index({ device_id: 1 });

module.exports = mongoose.model('Location', LocationSchema);