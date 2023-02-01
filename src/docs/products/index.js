const getProducts = require('./getProduct');
const getProductsById = require('./getProductById');

module.exports = {
    paths:{
        '/products':{
            ...getProducts,
        },
        '/products/{id}':{
            ...getProductsById,
        }
    }
}