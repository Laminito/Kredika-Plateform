'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      transactionNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      installmentPlanId: {
        type: Sequelize.UUID
      },
      paymentScheduleId: {
        type: Sequelize.UUID
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      paymentMethodCode: {
        type: Sequelize.STRING
      },
      externalTransactionId: {
        type: Sequelize.STRING
      },
      gatewayResponse: {
        type: Sequelize.JSON
      },
      statusCode: {
        type: Sequelize.STRING
      },
      processedAt: {
        type: Sequelize.DATE
      },
      failureReason: {
        type: Sequelize.TEXT
      },
      refundedAt: {
        type: Sequelize.DATE
      },
      refundAmount: {
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
    // Index pour payment_transactions
    await queryInterface.addIndex('payment_transactions', ['userId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('payment_transactions', ['installmentPlanId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('payment_transactions', ['paymentScheduleId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('payment_transactions', ['statusCode'], { schema: 'kredika_app' });
    await queryInterface.addIndex('payment_transactions', ['transactionNumber'], { schema: 'kredika_app', unique: true });
    await queryInterface.addIndex('payment_transactions', ['externalTransactionId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('payment_transactions', ['processedAt'], { schema: 'kredika_app' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_transactions', {
      schema: 'kredika_app'
    });
  }
};