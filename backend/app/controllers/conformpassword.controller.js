const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const conformpasswordservice = require('../services/conformpassword.service');

    exports.verifyToken = (req, res) => {
        res.status(200).send("token verified.");
    
   

   conformpasswordservice.conformpassword(req,res);
  
  
  };