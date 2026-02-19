
const db = require("../models");
const Product = db.product;


const getAllproducts = async (req, res) => {

    Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });

};

const getONEproduct = async (req, res) => {
    
    Product.findONE()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });

};

const getByPkproduct = async (req, res) => {
    Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving product with id=" + id
      });
    });
};




module.exports = {

getAllproducts,
getONEproduct,
getByPkproduct


};