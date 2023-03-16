const mongoose = require("mongoose");

const PDVSchema = new mongoose.model("PDV", {
  user: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  totalSell: Number,
  cpfcnpjClient: String,
  state: String,
  paymentMethods: [
    {
      method: String,
      value: Number,
    },
  ],
  discount: Number,
  createdAt: Date,
});

module.exports = PDVSchema;
