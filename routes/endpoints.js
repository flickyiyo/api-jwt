'use strict'
var router = require('express').Router();
var jwt = require('jwt-simple');
var createtoken = require('./createToken');
var moments = require('moment');
var cors = require('cors');
var secret = require('../config/tokensecret').secret;

var collection;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/mi-database',function(err,db){
    if(!err){
        console.log('Connected');
        collection = db.collection('productos');
    }
    else{
        console.log('Error al conectar a mongodb');
    }
});
function ensureAuthorized(req,res,next){
    console.logs(req,headers);
    if(req.headers.authroization){
        console.log('->'+req.headers.authroization);
        try{
            var payload = jwt.decode(req.headers.authroization,secret);
        }
        catch(exception){
            res.set('Content-Type','application/json').send(JSON.stringify({
                status:403,
                message:'Error 1'
            }));
        }
        if(payload.exp > moments().unix()){
            console.log(loggedUser);
            next();
        }
    }
}
router.get('/productos',cors(),function(req,res){
    'use strict'
    collection.find().toArray(function(err,items){
        var resultado;
        if(!err){
            resultado = {
                status:200,
                result:items
            }
        }else{
            resultado = {
                status:500,
                result:err
            }
        }
        res.set('Content-Type','application/json').send(JSON.stringify(resultado));
    })
})
module.exports = router;