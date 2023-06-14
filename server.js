//CREATE EXPRESS APP
const exp = require("express");
const app = exp();
const path=require('path')

//connect react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))

//import MongoClient
const mngClient = require("mongodb").MongoClient;

//connecting to MongoDB server with mongo client
mngClient
  .connect("mongodb://127.0.0.1:27017/ecedb")
  .then((client) => {
    //get db obj
    let db = client.db("ecedb");
    //get  usercollection obj
    let usersCollectionObj = db.collection("users");
    //get proudct collection obj
    let productsCollectionObj = db.collection("products");
    //share usersCollectionObj
    app.set("usersCollectionObj", usersCollectionObj);
    //share usersCollectionObj
    app.set("productsCollectionObj", productsCollectionObj);

    console.log("Database connected successfully");
  })
  .catch((err) => console.log("err in db connect ", err));

const userApp = require("./apis/userApi");
const productApp = require("./apis/productApi");

//if path starts with /user-api, then forward req to userApi
app.use("/user-api", userApp);
//if path starts with /product-api, then forward req to productApi
app.use("/product-api", productApp);



//middleware to handle invalid path
app.use((req,res,next)=>{
  res.send({message:'Invalid path'})
})

//error handling middleware
app.use((err,req,res,next)=>{
  res.send({message:"error occurred",error:err.message})
})

//assign port number to HTTP Server
app.listen(4000, () => console.log("server listening on port 4000..."));
