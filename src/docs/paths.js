const auth = require('./auth');
const products = require('./products');

module.exports = {
    paths:{
        ...auth.paths,
        ...products.paths
    }
}