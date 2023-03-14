const mongoose = require("mongoose");


const clientsSchema = mongoose.model("Clients", {
    name: String,
    cpfcnpj: String,
    email: String,
    phone: String,
    address: String,
    purchases: [
        {
            productsID: [
                {
                    productID: String,
                    quantity: Number,
                    totalValue: Number,
                }
            ],
            paymentMethods: [
                {
                    type: String,
                    value: Number,
                }
            ],
            totalValue: Number,
            date: Date,
        }
    ],
    createdAt: Date,
});

module.exports = clientsSchema;