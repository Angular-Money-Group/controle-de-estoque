const getProducts = require('./getProduct');
const getProductsById = require('./getProductById');
const importProducts = require('./importProducts');
const exportProducts = require('./exportProducts');

module.exports = {
    paths:{
        '/products':{
            ...getProducts,
        },
        '/products/{id}':{
            ...getProductsById,
        },
        '/products/stock/import':{
            ...importProducts,
        },
        '/products/stock/export':{
            ...exportProducts,
        },

    }
}