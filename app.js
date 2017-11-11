/*
This project is written with expressJS written on top of node

Mongoose is the database connector to a NoSQL database running locally

@author: v_ranga <v_ranga@gcitmail.com>
*/

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
const route = require('./routes/route');

//Constants
const port = 3000;

//Adding middle ware-cors
app.use(cors());
//Adding middle ware
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/products');

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB database ");
})


//routes
app.use('/api',route);

//Defining the port
app.listen(port,() =>{
console.log('server started on port'+port);
});