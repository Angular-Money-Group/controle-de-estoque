const cashiers = require('./cashiers');
const openCashier = require('./openCashier');
const closeCashier = require('./closeCashierById');
const addCashier = require('./addCashier');
const removeCashier = require('./removeCashier');
const getCashiersData = require('./getCashiersData');

module.exports = {
    paths:{
        '/cashiers':{
            ...cashiers,
        },
        '/getCashiersData':{
            ...getCashiersData,
        },
        '/openCashier':{
            ...openCashier,
        },
        '/closeCashier/{id}':{
            ...closeCashier,
        },
        '/addCashier/{id}':{
            ...addCashier,
        },
        '/removeCashier/{id}':{
            ...removeCashier,
        },
    }
}