const express=require('express');
const router=express.Router(); 
const Users = require('../models/Users')

const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/Users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
JWT_SEC_KEY="Akuisgood";
const fetchuser = require('../middleware/fetchuser')


router.post('/createuser',[
      body('email','enter a valid email').isEmail(),
      body('name','enter a valid name').isLength({ min: 3 }),
       body('password','pass must greater than 5').isLength({ min: 5 }),
],async(req,res)=>{
  let success=false;
      //if error return the bad request and error
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    // check whether a person already exist
    try{
    let user = await Users.findOne({email:req.body.email});
    // console.log(user);
   if(user){
      return res.status(400).json({error:"sorry a user with this email already exist"});
   }

   const salt =  bcrypt.genSaltSync(saltRounds);
const hash =  bcrypt.hashSync(req.body.password, salt);

    user= await Users.create({
      name: req.body.name,
      password: hash,
      email: req.body.email,
    })
    let success=true;
//     .then(users => res.json(users)).catch(err=>{console.log(err)
// res.json({error:'please enter valid details'})});
const data ={user:{id:user.id}};
const token = jwt.sign(data, JWT_SEC_KEY);
console.log(success,token);

 res.json({success,authtoken: token});}
 catch(error){
console.log(error.message);
res.status(500).send("Some error occured");
 }

      
})

// Route 2: login block

router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','cannot be black password').exists()
],async(req,res)=>{
  let success=false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      let user = await Users.findOne({email});
      if(!user){
        res.status(400).json({success,error:"invalid details"});
}
     const passwordCompare= bcrypt.compareSync(password, user.password); 
     if(!passwordCompare){
      res.status(400).json({success,error:"invalid details"});
}
const data ={
  user:{
    id:user.id
  }};
const token = jwt.sign(data, JWT_SEC_KEY);
success=true;
res.json({success,token});


    }catch(error){
      console.log(error.message);
      res.status(500).send("internal server error");
       }

})


// Route 3: get details

router.post('/getdetails',fetchuser,async(req,res)=>{
try {
  userId= req.user.id;
  const user =await Users.findById(userId).select("-password");
  res.send(user);
}catch(error){
      console.log(error.message);
      res.status(500).send("internal server error");
       }
})
module.exports= router;