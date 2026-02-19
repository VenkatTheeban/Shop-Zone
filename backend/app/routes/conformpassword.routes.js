module.exports = app => {
   const conformpasswordcontroller = require("../controllers/conformpassword.controller.js");
   const { authJwt } = require("../middleware");
      
        var router = require("express").Router();
      
        
        app.use('/api/conformpassword', router);
      
        app.use(function(req, res, next) {
          res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
        });
      router.post("/",[authJwt.verifyToken],conformpasswordcontroller.verifyToken);
     
    };