const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");

//load input validation
const validateRegisterInput = require("../../validation/register.js");
const validateLoginInput = require("../../validation/login.js");

//user model

const User = require("../../models/User");

//@router
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      console.log(newUser);

      //ofcoz hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err){
            console.log(err);
          }
          newUser.password = hash;

          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log("Error:", err));
        });
      });
    }
  });
});
//router validateLoginInput

router.post('/login',(req,res)=>{
  const {errors, isValid}=validateLoginInput(req.body);
  console.log(isValid);
  if (!isValid){
    return res.status(400).json(errors);
  }
  const email=req.body.email;
  const password=req.body.password;

  User.findOne({email}).then(user=>{
    if(!user){
      return  res.status(404).json({emailnotfound:"Email not found"});
    }
      console.log(user);

    bcrypt.compare(password,user.password).then(isMatch=>{
      if(isMatch){
        const payload={id:user.id,name:user.name}
        //sign
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn:31556926
          },
          (err,token)=>{
            res.json({
              success:true,
              token:"Bearer"+token
            });
          }
        );
      }else{
        return res.status(400).json({passwordincorrect:"Incorrect password"})
      }

    })
  })
})
module.exports=router
