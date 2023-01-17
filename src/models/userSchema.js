const mongoose = require("mongoose");

const userSchema = new mongoose.model('User',{
    name: {type: String},
    email: {type: String},
    role: {type: String},
    password: {
        type: String,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
})

module.exports = userSchema;