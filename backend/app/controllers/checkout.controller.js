const db = require("../models");
const Order = db.order;

exports.placeOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, totalAmount } = req.body;

    if (!userId || !productId || !quantity || !totalAmount) {
      return res.status(400).send({ message: "Missing order data" });
    }

    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalAmount
    });

    res.status(201).send({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to place order"
    });
  }
};
