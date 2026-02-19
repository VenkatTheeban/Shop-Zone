module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      name: { type: Sequelize.STRING },
      price: { type: Sequelize.FLOAT },
      description: { type: Sequelize.TEXT },
      brand: { type: Sequelize.STRING },
      category: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      rating: { type: Sequelize.FLOAT },
      stock: { type: Sequelize.INTEGER },
      activeInd: { type: Sequelize.INTEGER }
    },
    {
      timestamps: true, // 👈 Enables createdAt & updatedAt
    }
  );

  return Product;
};
