const auth = require('./auth');
const products = require('./products');
const patrimony = require('./patrimony');
const pdv = require('./pdv');
const cashiers = require('./caixas');
const home = require('./home');

module.exports = {
    paths:{
        ...auth.paths,
        ...home.paths,
        ...products.paths,
        ...patrimony.paths,
        ...pdv.paths,
        ...cashiers.paths,
    }
}