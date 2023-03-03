const mongoose = require("mongoose");

const userSchema = new mongoose.model('User',{
    name: {type: String},
    email: {type: String},
    cpfcnpjBusiness: {type: String},
    password: {
        type: String
    },
    logs: [{
        action: String,
        date: Date,
        description: String
    }]
})

module.exports = userSchema;