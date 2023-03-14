const createPDV = require("./createPDV");
const getPDV = require("./getPDV");
const getPDVbyId = require("./getPDVbyId");
const recivePDV = require("./recivePDV");

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