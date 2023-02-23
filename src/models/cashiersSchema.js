const mongoose = require("mongoose");

const cashiersSchema = new mongoose.model('Cashiers', {
    name: String,
    totalCash: Number,
    state: String,
    history: [
        {
            user: String,
            operation: String,
            value: Number,
            date: Date,
        }
    ],
    sales: [Number],
    createdAt: Date
})

module.exports = cashiersSchema;