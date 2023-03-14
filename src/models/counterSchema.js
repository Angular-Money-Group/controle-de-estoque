const mongoose = require('mongoose');

const counterSchema = mongoose.model("counters", {
    _id: String,
    seq: Number
});

module.exports = counterSchema;