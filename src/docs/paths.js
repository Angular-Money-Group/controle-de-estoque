const auth = require('./auth');
const products = require('./products');
const patrimony = require('./patrimony');

module.exports = {
    paths:{
        ...auth.paths,
        ...products.paths,
        ...patrimony.paths
    }
}