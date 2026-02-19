const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.product = require("./product.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);

// USER ↔ ROLES
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// ---------------------
// ORDER RELATIONSHIPS
// ---------------------

// USER → hasMany Orders
db.user.hasMany(db.order, { foreignKey: "userId" });
db.order.belongsTo(db.user, { foreignKey: "userId" });

// PRODUCT → hasMany Orders
db.product.hasMany(db.order, { foreignKey: "productId" });
db.order.belongsTo(db.product, { foreignKey: "productId" });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
