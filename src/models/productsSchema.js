const mongoose = require("mongoose");

const productsSchema = new mongoose.model('Products', {
    name: String,
    priceCost: Number,
    priceSell: Number,
    barCode: String,
    description: String,
    category: String,
    imageBase64: String,
    moveStock: Number,
    realStock: Number,
    initialStock: Number,
    createdAt: Date,
    updatedAt: Date
})

module.exports = productsSchema;