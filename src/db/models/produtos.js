'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsToMany(models.Tags,{
        through: 'ProductTags',
        foreignKey: 'productId',
        otherKey: 'tagId'
      });
    }
    
  }
  Products.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.DECIMAL(10,2),
    foto: DataTypes.STRING,
    em_promocao: DataTypes.BOOLEAN,
    preco_promocional: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'Products',
  });
  sequelize.sync();
  return Products;
};