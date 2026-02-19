const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const TokenGenerator = require('uuid-token-generator');
const tokgen2 = new TokenGenerator(256,TokenGenerator.BASE62);
const authvalidation = require('../validations/auth.validation')

const register = async (req, res) => {

// Create a user
 const user = {
  username: req.body.username,
  email: req.body.email,
  password: bcrypt.hashSync(req.body.password, 8),
  token:tokgen2.generate(),
};

  // Save Product in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating user."
      });
    });
};

const login = async (req, res) => {
  User.findOne({
    attributes: {exclude:['id','email']},
    where: {
      username: req.body.username
    }
  })
  .then(user => {
   if (!user) {
     return res.status(404).send({ message: "User Not found." });
   }
   var passwordIsValid = bcrypt.compareSync(
     req.body.password,
     user.password
   );
   if (!passwordIsValid) {
     return res.status(401).send({
       accessToken: null,
       message: "Invalid Password!"
     });
   }
   var token = jwt.sign({ id: user.token }, config.secret, {
     expiresIn: 86400 // 24 hours
   });
   var refreshtoken = jwt.sign({ id: user.token }, config.secret, {
    expiresIn: 86400 // 24 hours
 });

     res.status(200).send({
       username: user.username,
       accessToken: token,
       refreshtoken:refreshtoken,
       id: user.token
     });
  
 })
 .catch(err => {
   res.status(500).send({ message: err.message });
 });
    
 };
  
 

    



 
module.exports = {

  register,
  login  

};
  
  