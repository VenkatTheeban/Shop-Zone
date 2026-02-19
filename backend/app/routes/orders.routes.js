module.exports = app => {
  const orders = require("../controllers/orders.controller.js");
  const router = require("express").Router();

  // POST → /api/orders/place
  router.post("/place", orders.placeOrder);

  // Register router with base URL
  app.use("/api/orders", router);
};
