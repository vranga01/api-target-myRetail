/*
The code below contains routing information and some business logic.
Following details are added:
    1. Get all products.
    2. Get product by Id
    3. Put a product (only pricing details) referenced by Id

Get all products:
    This is to fetch all the products that have pricing details (this will not include product names).

Get product by ID:
    We assume that there is an external API facade to give us the product name. See lines: 31-36
    After that, the product name is populated.
    A jSON is returned with the all populated details.

Put product by ID:
    This performs update onto the database referencing through the ID of the product

@author: v_ranga <v_ranga@gcitmail.com>
*/

const express = require('express');
const Name = require('../model/name')
const Product = require('../model/product')
const router = express.Router();

router.get('/products',(req,res,next)=>{
    Product.find((err,products)=>{
        res.json(products);
    })
})

router.get('/products/:id',(req,res,next)=>{
    //call a funbction
    var returnName = new Name();
    Name.findOne({id:req.params.id}, (err,names)=> {
        if (err) {
            res.json({msg: "Error when fetching product name."});
        } else if (returnName === null) {
            res.json({msg: "Product details don't exist for the given id: " + req.params.id})
        }
        returnName =  names; 
    });
    Product.findOne({id:req.params.id},(err,products)=>{
        if (err) {
            res.json({msg: "Error when fetching pricing details"});
        } else if (products === null) {
            res.json({msg: "Pricing details don't exist for the given id: " + req.params.id});
        } else {
            products.name = returnName.name;
            res.json(products);
        }
    });
}) 

router.put('/products/:id',(req,res,next)=>{

    var newContact = new Product({
             id:req.body.id,
             current_price:{
                value : req.body.current_price.value,
                currency_code: req.body.current_price.currency_code
             }
    })
    Product.updateOne({
        "id": newContact.id
    }, {
        $set: {
            current_price:{
                value : newContact.current_price.value,
                currency_code: newContact.current_price.currency_code
            }
        }
    }, function(err, results) {
        if(err){
            res.json({msg:'Unable to update'});
        }
        else{
            res.json({msg:'Product updated sucessfully'});
        }
    });
}) 

module.exports = router;