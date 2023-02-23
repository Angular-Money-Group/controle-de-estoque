const mongoose = require("mongoose");

const PDVSchema = new mongoose.model('PDV', {
    user: String,
    products: [{ productID: String, quantity: Number, price: Number, total: Number }],
    totalSell: Number,
    state: String,
    paymentMethods: [
        {
            method: String,
            value: Number,
        }
    ],
    discount: Number,
    createdAt: Date,
})

module.exports = PDVSchema;