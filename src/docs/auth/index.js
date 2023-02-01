const login = require('./login');
const register = require('./register');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');

module.exports = {
    paths:{
        '/auth/v1/login':{
            ...login,
        },
        '/auth/v1/register':{
            ...register,
        },
        '/auth/v1/forgotPassword':{
            ...forgotPassword,
        },
        '/auth/v1/resetPassword/{userId}/{token}':{
            ...resetPassword,
        }
    }
}