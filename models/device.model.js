var mongoose = require('mongoose');

// Device schema
const DeviceSchema = new mongoose.Schema({
    "device_id": {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    "location": {
        "data": {
            "speed": {
                type: Number
            },
            "altitude": {
                type: Number
            },
            "location_accuracy": {
                type: Number
            },
            "bearing": {
                type: Number
            },
            "location": {
                "type": {
                    type: String,
                    default: 'Point'
                },
                "coordinates": {
                    type: [Number]
                }
            }
        },
        "recorded_at": {
            type: Date
        }
    },
    "activity": {
        "data": {
            "value": {
                type: String
            }
        },
        "recorded_at": {
            type: Date
        }
    },
    "device_health": {
        "data": {
            "value": {
                type: String
            },
            "hint": {
                type: String
            }
        },
        "recorded_at": {
            type: Date
        }
    },
    "device_status": {
        type: String,
        required: true
    },
    "views": {
        "share_url": {
            type: String
        },
        "embed_url": {
            type: String
        }
    },
    "metadata": {
        type: String
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
    collection: 'Device'
});

// index device_id
DeviceSchema.index({ device_id: 1 });

module.exports = mongoose.model('Device', DeviceSchema);