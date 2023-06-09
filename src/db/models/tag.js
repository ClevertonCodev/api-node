'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tags.belongsToMany(models.Products, {
        through: 'ProductTags',
        foreignKey: 'tagId',
        otherKey: 'productId'
      });
    }
  }
  Tags.init({
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
  });
  sequelize.sync();
  return Tags;
};