'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();

var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/mi-database',function(error,db){
    if(!error){
        console.log('Mongodb connect');
        /*var collection = db.collection('productos');
        var producto = {
            name:'Paquete 1',
            price:123.12,
            description:'Descripcion de paquete'
        }
        collection.insert(producto);*/
    }
})
var endpoints = require('./routes/endpoints');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/',endpoints);
var routes = express.Router();
app.use(routes);

app.options('*',cors());
var routes=express.Router();
var port = process.env.PORT||4000;
app.listen(port,function(){
    console.log('Listening:http://localhost:'+port);
})