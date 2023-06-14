//create mini-express app
const exp = require("express");
const productApp = exp.Router();
//body parsing middleware
productApp.use(exp.json());

//products API routes
//create product
productApp.post("/product", async (req, res) => {
  //get product collection obj
  let productsCollectionObj = req.app.get("productsCollectionObj");
  //get new product
  let newProduct = req.body;
  //check if any product already in DB with same product num of new product
  let product = await productsCollectionObj.findOne({
    productId: newProduct.productId,
  });
  //if product existed
  if (product !== null) {
    res.send({ message: "A product with this id already existed" });
  } else {
    //insert into DB
    await productsCollectionObj.insertOne(newProduct);
    //send res
    res.send({ message: "New product created" });
  }
});
//read a product by productID
productApp.get("/products/:id", async (req, res) => {
  //get product collection obj
  let productsCollectionObj = req.app.get("productsCollectionObj");
  //get prod ifd from url
  let productIdOfUrl = Number(req.params.id);
  //find product by id
  let product = await productsCollectionObj.findOne({
    productId: productIdOfUrl,
  });
  //send res
  res.send({ message: "one product", payload: product });
});



//read all products
productApp.get("/products", async (req, res) => {
  //get product collection obj
  let productsCollectionObj = req.app.get("productsCollectionObj");

  //find product by id
  let products = await productsCollectionObj.find().toArray();
  //send res
  res.send({ message: "one product", payload: products });
});
//update product by productID
//delete product
//restore product

//export productApp
module.exports = productApp;
