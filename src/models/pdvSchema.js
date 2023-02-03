const mongoose = require("mongoose");

const PDVSchema = new mongoose.model('PDV', {
    userID: String,
    products: [{ productID: String, quantity: Number}],
    totalSell: Number,
    state: String,
    createdAt: Date,
})

module.exports = PDVSchema;