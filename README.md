# myRetail Case Study for Target

## Section 1: Overview of Project
The project is designed with two-layered architecture: mid-tier and back-end. The mid-tier is built with expressJS built on top of NodeJS. This project exposes three end-points described below:
- Get all pricing details: a HTTP GET response to all that is stored in the database.
- Get a product by ID: a HTTP GET response to get a single product wrapped with product name sourced from an external API.
- Update a product by ID: a HTTP PUT response to get a body and update the product referenced through the primary key.

I was asked to choose a stack of my choice; I chose:

* ExpressJS and NodeJS
  - Since the response is jSON, a javascript based middle-tier would work nicely--it breaks down boundaries betweeen front-end and back-end.
  - The calls are asynchronous, so running and debugging would work without much difficulties.
  - It has NoSQL integration made available through mongoose framework
* MongoDB
  - Formatting and mapping work nicely with a MongoDB database.
  - Not any conventional problems referenced through relational databases. Flexible and generous in its way of handling and returning data.
* NPM
  - Easy answer to a package managing solution associated with Node.
  - Some really great command-line tools
  
## Section 2: How To Run Locally
To run locally, there are three thing you would need to do. 
  - Run a local instance of MongoDB
  - Extract package.json file provided here
  - Run the application itself.
### Run a local instance of MongoDB
To install latest MongoDB, run the following command on Terminal:
```brew install mongodb```
To run MongoDB, assuming you have read and write permissions, do
```mongod```
This project is already connected to `mongodb://localhost:27017/products`. This would require a database called `products`. This can be achieved in two ways: through command-line tools or a third-party UI provider like RoboMongo. 
```use products```
This code makes use of two publicly available collections in NoSQL: `products` and `names`. The schema is already defined in the code, but `products` collection has objects (ideally) that is of the following design:
```
var ProductSchema = mongoose.Schema({
    id: { type: Number,required:true },
    name: { type: String,required:true},
    current_price:{
        value : {type:Number,required:true},
        currency_code : {type:String,required:true}
    }
  });
```
Also, another schema to access the product name referenced through the id of the product itself.
```
var NameSchema = mongoose.Schema({
    id: { type: Number,required:true, unique:true },
    name: { type: String,required:true}
  });
```
Once the two collections are created, it would also require some sample data, since the project does not have an API facade to insert documents into the database.
### Extract package.json
This would include a simple command-line function to extract all the details. Assuming the pointer is to the project folder, run:
```npm install```
This would create a new folder called `node_modules` in the project directory.
### Run the application
Assuming you are in the project folder, run `app.js` using the following command:
```nodemon```

## Section 3: Summary
It's been a while since I used java-script frameworks, so by leveraging a back-end and front-end that could work without barriers, I was able to quickly adapt to a new style of coding. The route/model/app combination worked really well in exposint the end-points required for the project. The heart of the application is in the way it combines two different schemas to provide an exhaustive jSON file that includes both the details. For an environment full of micro-services (which Target has I believe) this communication is crucial.
