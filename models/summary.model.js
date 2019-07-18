var mongoose = require('mongoose');

// Device schema
const SummarySchema = new mongoose.Schema({
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
    "distance": {
        type: Number
    },
    "steps": {
        type: Number
    },
    "duration": {
        type: Number
    },
    "start_datetime": {
        type: Date
    },
    "end_datetime": {
        type: Date
    },
    "segments": {
        type: [Object]
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
    collection: 'Summary'
});

// index device_id
SummarySchema.index({ device_id: 1 });

module.exports = mongoose.model('Summary', SummarySchema);