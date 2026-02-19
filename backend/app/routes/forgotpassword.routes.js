module.exports = app => {
const forgotpasswordcontroller = require("../controllers/forgotpassword.controller.js");
    const { authJwt } = require("../middleware");
  
    var router = require("express").Router();
  
    
    app.use('/api', router);
  
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    router.post("/forgotpassword",forgotpasswordcontroller.forgotpassword);
    router.post("/resetpassword",forgotpasswordcontroller.resetpassword);
    router.post("/passwordreset",[authJwt.verifyTokenwithid],forgotpasswordcontroller.passwordreset);

};