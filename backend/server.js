const express = require("express");
const cors = require("cors");
const config = require("./app/config/config");
const db = require("./app/models");

const app = express();

// -----------------------------
// CORS CONFIG
// -----------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

// -----------------------------
// Body Parsers
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Database Sync
// -----------------------------
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced successfully.");
  })
  .catch((err) => {
    console.log("❌ Failed to sync DB: " + err.message);
  });

// -----------------------------
// Default Route
// -----------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ShopZone Backend API" });
});

// -----------------------------
// ROUTES
// -----------------------------
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/docs.routes.js")(app);
require("./app/routes/forgotpassword.routes.js")(app);
require("./app/routes/conformpassword.routes.js")(app);
require("./app/routes/orders.routes.js")(app);


// -----------------------------
// Server Start
// -----------------------------
const PORT = config.port || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
