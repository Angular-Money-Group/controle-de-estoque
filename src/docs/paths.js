const auth = require('./auth');
const products = require('./products');
const patrimony = require('./patrimony');
const pdv = require('./pdv');

module.exports = {
    paths:{
        ...auth.paths,
        ...products.paths,
        ...patrimony.paths,
        ...pdv.paths
    }
}