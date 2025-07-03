'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      cartId: {
        type: Sequelize.UUID
      },
      productId: {
        type: Sequelize.UUID
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      paymentMethodCode: {
        type: Sequelize.STRING
      },
      creditDuration: {
        type: Sequelize.INTEGER
      },
      creditFrequencyCode: {
        type: Sequelize.STRING
      },
      commissionRate: {
        type: Sequelize.DECIMAL
      },
      totalAmount: {
        type: Sequelize.DECIMAL
      },
      installmentAmount: {
        type: Sequelize.DECIMAL
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      schema: 'kredika_app'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items', {
      schema: 'kredika_app'
    });
  }
};