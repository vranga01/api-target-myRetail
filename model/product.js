/*
The code below is to connect to the database schema (mongoose).
The schema relates to the details of a product.
The product has two parameters:
    1. ID: product id that is unique (unique switch is on)
    2. Name: product name of type string (to be populated as null when pulled from database)
    3. Current price: pricing details of the product of type json
            1. Value: Price itself of type number
            2. Currency_code: Code of the currency of type String. Ex. USD, INR etc.

@author: v_ranga <v_ranga@gcitmail.com>
*/

const mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
    id: { type: Number,required:true },
    name: { type: String,required:true},
    current_price:{
        value : {type:Number,required:true},
        currency_code : {type:String,required:true}
    }
  });

var Product = module.exports = mongoose.model('Product',ProductSchema);