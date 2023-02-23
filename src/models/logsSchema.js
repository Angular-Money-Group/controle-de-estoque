const mongoose = require("mongoose");

const logsSchema = mongoose.model("Logs", {
    user: String,
    action: String,
    date: Date,
    description: String,
});


module.exports = logsSchema;