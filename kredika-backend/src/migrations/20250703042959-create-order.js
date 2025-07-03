'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      deliveryAddressId: {
        type: Sequelize.UUID
      },
      totalAmount: {
        type: Sequelize.DECIMAL
      },
      statusCode: {
        type: Sequelize.STRING
      },
      paymentStatusCode: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      deliveryDate: {
        type: Sequelize.DATE
      },
      completedAt: {
        type: Sequelize.DATE
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
    // Index pour orders
    await queryInterface.addIndex('orders', ['userId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('orders', ['deliveryAddressId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('orders', ['statusCode'], { schema: 'kredika_app' });
    await queryInterface.addIndex('orders', ['paymentStatusCode'], { schema: 'kredika_app' });
    await queryInterface.addIndex('orders', ['orderNumber'], { schema: 'kredika_app', unique: true });
    await queryInterface.addIndex('orders', ['deliveryDate'], { schema: 'kredika_app' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders', {
      schema: 'kredika_app'
    });
  }
};