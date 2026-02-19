const db = require("../models");
const Product = db.product;

exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.query.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
