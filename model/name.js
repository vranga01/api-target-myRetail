/*
The code below is to connect to the database scema (mongoose).
The schema relates to the details of a product.
The product has two parameters:
    1. ID: product id that is unique (unique switch is on)
    2. Name: product name of type string


@author: v_ranga <v_ranga@gcitmail.com>
*/

const mongoose = require('mongoose');
var NameSchema = mongoose.Schema({
    id: { type: Number,required:true, unique:true },
    name: { type: String,required:true}
  });

var Name = module.exports = mongoose.model('Name',NameSchema); 
  