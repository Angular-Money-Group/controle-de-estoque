const mongoose = require("mongoose");

const userSchema = new mongoose.model('User',{
    name: {type: String},
    email: {type: String},
    role: {type: String},
    password: {
        type: String
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    }
})

module.exports = userSchema;