var express = require('express');
var router = express.Router();
const User = require("../models/userModels");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Narayana Health' });
});

//////////////////////////////ADD/////////////////////////////////////

router.get("/add" , function(req,res,next){
  res.render("add" , ({ title : 'ADD PATIENT'}))
});
router.post("/add" , async function(req,res,next){
  try {
    const patient = User(req.body)
    await patient.save();
    res.redirect("/add")
  } catch (error) {
    console.log(error);
  }
})

//////////////////////////////////list///////////////////////////////////////////////

router.get("/list" , async function(req,res,next){
  const users = await User.find();
  res.render("list" , ({title:"Patient List" , users}))
})

/////////////////////UPDATE////////////////////////////////////////////

router.get('/update/:id' , async function(req,res,next){
  var currentuser = await User.findOne({ _id:req.params.id});
  res.render("update", { user:currentuser , title : "Update Information" })
})
router.post("/update/:id" , async function(req,res,next){
  try {
    await User.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/list");
  } catch (error) {
    res.send(error);  
  }
});


/////////////////////////////delete//////////////////////////////////////

router.get("/delete/:id" , async function(req,res,next){
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/list")
  } catch (error) {
    console.log(error);
    
  }
})

module.exports = router;
