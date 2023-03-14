const getInfos = require('./getInfos');

module.exports = {
    paths:{
        '/getInfos':{
            ...getInfos,
        },
    }
}