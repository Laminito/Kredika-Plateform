'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      orderId: {
        type: Sequelize.UUID
      },
      productId: {
        type: Sequelize.UUID
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      unitPrice: {
        type: Sequelize.DECIMAL
      },
      totalPrice: {
        type: Sequelize.DECIMAL
      },
      paymentMethodCode: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'order_items' },
      ['orderId'],
      { name: 'idx_order_items_orderId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'order_items' },
      ['productId'],
      { name: 'idx_order_items_productId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'order_items' },
      ['isDeleted'],
      { name: 'idx_order_items_isDeleted' }
    );

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items', {
      schema: 'kredika_app'
    });
  }
};