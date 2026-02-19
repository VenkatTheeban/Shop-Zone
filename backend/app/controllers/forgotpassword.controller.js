const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
nodemailer = require('nodemailer');

const forgotpasswordservice = require('../services/forgotpassword.service');

//Forgot password
exports.forgotpassword = (req, res) => {
       forgotpasswordservice.forgotpassword(req,res);
}

//Reset password through forgot password 
exports.resetpassword = (req, res) => {
       forgotpasswordservice.resetpassword(req,res);
}

//Reset password after log-on using credentials 
exports.passwordreset = (req, res) => {
       forgotpasswordservice.passwordreset(req,res);
}




