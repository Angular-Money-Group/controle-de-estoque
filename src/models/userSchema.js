const mongoose = require("mongoose");

const userSchema = new mongoose.model('User',{
    name: String,
    email: String,
    role: String,
    password: String,
})

module.exports = userSchema;