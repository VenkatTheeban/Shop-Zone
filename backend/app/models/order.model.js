module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "Placed"
    }
  });

  return Orders;
};
