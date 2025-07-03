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
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      deliveryAddressId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    // Index pour orders - avec la syntaxe correcte pour le schéma
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['userId'],
      { name: 'idx_orders_userId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['deliveryAddressId'],
      { name: 'idx_orders_deliveryAddressId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['statusCode'],
      { name: 'idx_orders_statusCode' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['paymentStatusCode'],
      { name: 'idx_orders_paymentStatusCode' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['orderNumber'],
      { name: 'idx_orders_orderNumber', unique: true }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['deliveryDate'],
      { name: 'idx_orders_deliveryDate' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'orders' },
      ['isDeleted'],
      { name: 'idx_orders_isDeleted' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders', {
      schema: 'kredika_app'
    });
  }
};