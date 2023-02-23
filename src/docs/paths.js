const auth = require('./auth');
const products = require('./products');
const patrimony = require('./patrimony');
const pdv = require('./pdv');
const cashiers = require('./caixas');

module.exports = {
    paths:{
        ...auth.paths,
        ...products.paths,
        ...patrimony.paths,
        ...pdv.paths,
        ...cashiers.paths
    }
}