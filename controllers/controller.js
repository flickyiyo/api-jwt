'use strict'
var mongo = require('mongodb').MongoClient;
var collection;
mongo.connect('mongodb://localhost:27017/mi-database',function(err,db){
    if(!err){
        collection = db.collection('productos');
    }else{
        console.log('error conectando controladores');
        throw err;
    }
})
function getAll(req,res){
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
}

module.exports={
    getAll
}