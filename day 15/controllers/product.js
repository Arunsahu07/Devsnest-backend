const { Op } = require("sequelize");
const Product = require("../models/product");
const product = async (req, res) => {
  const { page } = req.params;
  try {
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: page * 10,
        },
      },
      limit: 10,
    });
    console.log(products);
    res.status(200).json(products)
  } catch (err) {
      console.log(err);
      res.status(404).json("unable to connect")
  }
};
module.exports = product
