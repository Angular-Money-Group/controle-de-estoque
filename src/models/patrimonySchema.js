const mongoose = require("mongoose");

const patrimonySchema = new mongoose.model('Patrimony',{
    name: String,
    priceCost: Number,
    description: String,
    category: String,
    imageBase64: String,
    moveStock: Number,
    realStock: Number,
    initialStock: Number,
    createdAt: Date,
    updatedAt: Date,
})

module.exports = patrimonySchema;