const mongoose = require("mongoose");

const cashiersSchema = new mongoose.model('Cashiers', {
    name: String,
    totalCash: Number,
    stateCashier: {state: String, ip: String},
    history: [
        {
            user: String,
            operation: String,
            value: Number,
            ip: String,
            date: Date,
        }
    ],
    sales: [Number],
    createdAt: Date
})

module.exports = cashiersSchema;