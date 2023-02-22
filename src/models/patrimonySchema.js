const mongoose = require("mongoose");

const patrimonySchema = new mongoose.model('Patrimony',{
    name: String,
    priceCost: Number,
    description: String,
    category: String,
    patrimonyNumber: Number,
    imageBase64: String,
    moveStock: Number,
    realStock: Number,
    initialStock: Number,
    isActive: Boolean,
    observation: String,
    createdAt: Date,
    updatedAt: Date,
})

module.exports = patrimonySchema;