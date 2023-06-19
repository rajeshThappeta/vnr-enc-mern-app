//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken=require("./middlewares/verifyToken")
const expressAsyncHandler=require('express-async-handler')
const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')

//configure cloudinary
cloudinary.config({ 
  cloud_name: 'djqbwmvjg', 
  api_key: '492171555336437', 
  api_secret: 'OO5HtI8g0gpuIZyjR3m1jXa9-KE' 
});


//config cloudinary storage
const cloudinaryStorage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
    return{
      folder:'vnrece2023',
      public_id:'photo'+"-"+Date.now()
    }
  }
})


//configure multer
const upload=multer({storage:cloudinaryStorage})


//body parser middleware
userApp.use(exp.json());

//CREATE  USER API (Routes)

//route to read all users
userApp.get("/users", expressAsyncHandler(async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get users
  let users = await usersCollectionObj.find({ status: true }).toArray();
  //send res
  res.send({ message: "all users", payload: users });
}));

//route to read one user by username
userApp.get("/users/:username", expressAsyncHandler(async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;
  //find user by username
  let user = await usersCollectionObj.findOne({
    username: usernameOfUrl,
    status: true,
  });
  //send res
  res.send({ message: "one user", payload: user });
}));

//route to create new user
userApp.post("/user",upload.single('photo'),expressAsyncHandler( async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get new user from req
  let newUser =JSON.parse(req.body.newUser);
  //verify user's existance
  let existingUser = await usersCollectionObj.findOne({
    username: newUser.username,
  });
  //if user not existed
  if (existingUser === null) {
    //add status property to new user
    newUser.status = true;
    //hash the password
    let hashedPassword = await bcryptjs.hash(newUser.password, 5);
    //replace plain paassword with hashed password
    newUser.password = hashedPassword;
    //add image url to newUser
    newUser.profileImg=req.file.path;
    //remove photo propertyt
    delete newUser.photo;
    //create new user
    await usersCollectionObj.insertOne(newUser);
    res.status(201).send({ message: "created" });
  } else {
    res.send({ message: "User already existed" });
  }
}));

//user login
userApp.post("/user-login", expressAsyncHandler(async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get user cred obj
  let userCredObj = req.body;
  //verify username
  let userOfDb = await usersCollectionObj.findOne({
    username: userCredObj.username,
  });
  //if user not found
  if (userOfDb === null) {
    res.send({ message: "Invalid username" });
  }
  //if username is valid
  else {
    //compare passwords
    let result = await bcryptjs.compare(
      userCredObj.password,
      userOfDb.password
    );
    //if both are not matched
    if (result === false) {
      res.send({ message: "Invalid password" });
    }
    //if passwords are matched
    else {
      //create a token
      let signedToken = jwt.sign({ username: userOfDb.username }, "abcdef", {
        expiresIn: 15,
      });
      //send token in res
      res.send({
        message: "login success",
        token: signedToken,
        currentUser: userOfDb,
      });
    }
  }
}));

//route to update  a user by usernme
userApp.put("/user/:username",expressAsyncHandler( async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;
  //get modified user from client
  let modifiedUser = req.body;
  //update
  await usersCollectionObj.updateOne(
    { username: usernameOfUrl },
    {
      $set: {
        ...modifiedUser,
      },
    }
  );
  //send res
  res.send({ message: "User update success" });
}));

//route to delete a user by username
userApp.delete("/user/:username",expressAsyncHandler( async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;

  //soft delete
  await usersCollectionObj.updateOne(
    { username: usernameOfUrl },
    { $set: { status: false } }
  );
  //send res
  res.send({ message: "User deleted" });
}));

//route to delete a user by username
userApp.get("/restore-user/:username", expressAsyncHandler(async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;

  //soft delete
  await usersCollectionObj.updateOne(
    { username: usernameOfUrl },
    { $set: { status: true } }
  );
  //send res
  res.send({ message: "User restored" });
}));








//protected route
userApp.get("/protected-route", verifyToken, (req, res) => {
  res.send({ message: "This is private info" });
});






userApp.post("/write-review",verifyToken, (req, res) => {});

userApp.post("/buy-product", verifyToken,(req, res) => {});
userApp.post("/add-to-cart", verifyToken,(req, res) => {});

//export userApp
module.exports = userApp;
