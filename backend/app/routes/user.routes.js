module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const { authJwt } = require("../middleware");
 

  var router = require("express").Router();

  
  app.use('/api/user', router);

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // Retrieve all clothing
  router.get("/", [authJwt.verifyTokenwithid],user.userBoard);


};
