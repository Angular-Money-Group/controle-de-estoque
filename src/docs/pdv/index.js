const createPDV = require("./createPDV");
const getPDV = require("./getPDV");
const getPDVbyId = require("./getPDVbyId");

module.exports = {
    paths:{
        '/getPDV':{
            ...getPDV,
        },
        '/getPDV/{id}':{
            ...getPDVbyId,
        },
        '/createPDV':{
            ...createPDV,
        },

    }
}