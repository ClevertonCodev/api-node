'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'em_promocao', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Products', 'preco_promocional', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'em_promocao');
    await queryInterface.removeColumn('Products', 'preco_promocional');
  }
};
