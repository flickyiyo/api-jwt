var jwt = require('jwt-simple');
var moment = require('moment');
var expiration = require('../config/tokenExpiration');
var secret = require('../config/tokensecret');
module.exports = function createToken(username){
    'use strict'
    var payload = {
        sub:username,
        iat:moment().unix(),
        exp:moment().add(expiration.amount_time,expiration.type_time)
    }
    var token = jwt.encode(payload,secret);
    return token;
}