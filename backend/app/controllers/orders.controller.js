const db = require("../models");
const Order = db.order;   // FIXED

exports.placeOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, totalAmount, items } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Handle multiple items (cart checkout)
    if (items && Array.isArray(items)) {
      const orders = [];
      
      for (const item of items) {
        const order = await Order.create({
          userId,
          productId: item.productId,
          quantity: item.quantity || 1,
          totalAmount: item.price,
          status: "Placed"
        });
        orders.push(order);
      }

      return res.status(201).send({
        message: "Orders placed successfully",
        orders,
        totalItems: orders.length
      });
    }
    
    // Handle single item (buy now)
    if (!productId) {
      return res.status(400).send({ message: "Product ID is required for single item order" });
    }

    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalAmount,
      status: "Placed"
    });

    return res.status(201).send({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).send({ message: "Server error", error });
  }
};
