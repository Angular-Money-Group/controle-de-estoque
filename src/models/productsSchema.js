const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
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
});

schema.plugin(mongoosePaginate);

const productsSchema = new mongoose.model('Products', schema)

module.exports = productsSchema;