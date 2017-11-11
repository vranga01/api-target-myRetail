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

// function to return all products. Mapping: "/api/products"
router.get('/products',(req,res,next)=>{
    Product.find((err,products)=>{
        res.json(products);
    })
})

// function to return product with that specific ID. Call to another external (pretend) API
// Mapping: "/api/products/{id}
router.get('/products/:id',(req,res,next)=>{
    //call a funbction
    var returnName = new Name();
    // find that one product from NoSQL database and make a promise until another RestAPI call is made
    Name.findOne({id:req.params.id}, (err,names)=> {
        return new Promise (function(resolve, reject) {
            //pretend API call to fetch product name. Exception checks are detailed
            Product.findOne({id:req.params.id},(err,products)=>{
                    if (err) {
                        res.json({msg: "Error when fetching pricing details"});
                    } else if (products === null) {
                        res.json({msg: "Pricing details don't exist for the given id: " + req.params.id});
                    } else if (returnName === null) {
                        res.json({msg: "Product details don't exist for the given id: " + req.params.id})
                    } else {
                        products.name = returnName.name;
                        res.json(products);
                    }
             });
             if (err) {
                 res.json({msg: "Error when fetching product details"});
             }
             returnName =  names;
        });
    });
}) 

// function to put a product (update) with a specific ID.
// Mapping: "/api/products/{id}
router.put('/products/:id',(req,res,next)=>{

    // initialize a variable with details from request body
    var newContact = new Product({
             id:req.body.id,
             current_price:{
                value : req.body.current_price.value,
                currency_code: req.body.current_price.currency_code
             }
    })

    // update the database referencing through id
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
            res.json({msg:'Unable to update the pricing details'});
        }
        else{
            res.json({msg:'Pricing details updated sucessfully'});
        }
    });
}) 

module.exports = router;