module.exports = app => {

  const checkout = require("../controllers/checkout.controller.js");
  const { authJwt } = require("../middleware");

  const router = require("express").Router();

  // POST: place order (secure with JWT)
  router.post(
    "/place",
    [authJwt.verifyToken],     // <── secure endpoint
    checkout.placeOrder
  );

  app.use('/api/checkout', router);
};
