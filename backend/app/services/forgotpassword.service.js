const db = require("../models");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = db.user;
const emailservice = require('../services/email.service');
const { user } = require("../models");
const TokenGenerator = require('uuid-token-generator');
const tokgen2 = new TokenGenerator(256,TokenGenerator.BASE62);
var bcrypt = require("bcryptjs");


const forgotpassword = async (req, res) => {
 
  User.findOne({
    where: {
     email: req.body.email
    }
  })
  .then(user => {
   if (!user) {
     return res.status(404).send({ message: "Email not exists." });
   } else {

  const resetToken = tokgen2.generate();  

   User.update({resetToken : resetToken}, {
      where: { id:user.id }
     
    }).then(
      emailservice.sendResetPasswordEmail('r.omprakash23@gmail.com',resetToken)
    )
       
    return res.status(200).send({ message: "Reset link send to the registered email id" });
     
    }  
 
 })
 .catch(err => {
   res.status(500).send({ message: err.message });
 });
 
};

const resetpassword = async (req, res) => {

  User.findOne({
    where: {
     resetToken: req.body.resetToken
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "The reset link is not valid" });
    }
   
  
   // Update user with new encrypted password
    User.update({password : bcrypt.hashSync(req.body.password, 8)}, {
      where: { id:user.id }
     
    }).then(
      emailservice.PasswordResetSuccess('r.omprakash23@gmail.com','Password Changed Successfully')
    )

    return res.status(200).send({ message: "Password Changed successfully" });

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
 
};

const passwordreset = async (req, res) => {

  User.findOne({
    where: {
     token: req.body.id
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User is not valid" });
    }
   
  
   // Update user with new encrypted password
    User.update({password : bcrypt.hashSync(req.body.password, 8)}, {
      where: { token: req.body.id }
     
    }).then(
      emailservice.PasswordResetSuccess('r.omprakash23@gmail.com','Password Changed Successfully')
    )

    return res.status(200).send({ message: "Password reset successfully" });

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
 
};
module.exports = {
    forgotpassword,
    resetpassword,
    passwordreset
};