const mongoose = require("mongoose");

const logsSchema = mongoose.model("Logs", {
    action: String,
    user: String,
    date: Date,
    description: String,
});


module.exports = logsSchema;