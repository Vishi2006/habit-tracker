const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        default: "daily"
    },
    streak: {
        type: Number,
        default: 0
    },
    lastChecked: {
        type: Date
    },
    checkHistory: {
        type: [Date]
    },
    active: {
        type: Boolean,
        default: true
    },
    completedDates: {
        type: [Date],
        default: []
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('habit', habitSchema);