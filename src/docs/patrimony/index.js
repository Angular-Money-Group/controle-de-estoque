const patrimony = require('./patrimony');
const patrimonyById = require('./patrimonyById');

module.exports = {
    paths:{
        '/patrimony':{
            ...patrimony,
        },
        '/patrimony/{id}':{
            ...patrimonyById,
        }
    }
}