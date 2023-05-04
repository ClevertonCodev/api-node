const produtoSchema = require('./produtoSchema');

function validateProduto(req, res, next) {

    const Product = req.body;
    const isValid = produtoSchema(Product);
    if (!isValid) {
      return res.status(400).json(produtoSchema.errors);
    }
    next();
  }

  module.exports = validateProduto;