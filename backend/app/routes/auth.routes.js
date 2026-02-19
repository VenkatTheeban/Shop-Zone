module.exports = app => {

  console.log("✅ auth.routes.js loaded"); // DEBUG

  const { verifySignUp } = require("../middleware");
  const authController = require("../controllers/auth.controller.js");
  const router = require("express").Router();

  // CORS headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // -------------------------------
  // Auth Routes
  // -------------------------------

  // Register (Signup)
  router.post(
    "/register",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    authController.signup
  );

  // Login (Signin)
  router.post("/login", authController.signin);

  // Test Route
  router.get("/test", (req, res) => {
    res.send("Auth router is working.");
  });

  // Mount router
  app.use("/api/auth", router);
};
