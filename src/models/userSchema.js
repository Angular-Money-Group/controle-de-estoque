const mongoose = require("mongoose");

const userSchema = new mongoose.model('User',{
    name: {type: String, required: true,},
    email: {type: String, required: true,},
    role: {type: String, required: true,},
    password: {
        type: String,
        select: false,
        required: true,
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