'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('installment_plans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      planNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.UUID
      },
      orderId: {
        type: Sequelize.UUID
      },
      productId: {
        type: Sequelize.UUID
      },
      principalAmount: {
        type: Sequelize.DECIMAL
      },
      commissionRate: {
        type: Sequelize.DECIMAL
      },
      commissionAmount: {
        type: Sequelize.DECIMAL
      },
      totalAmount: {
        type: Sequelize.DECIMAL
      },
      installmentAmount: {
        type: Sequelize.DECIMAL
      },
      durationMonths: {
        type: Sequelize.INTEGER
      },
      frequencyCode: {
        type: Sequelize.STRING
      },
      totalInstallments: {
        type: Sequelize.INTEGER
      },
      paidInstallments: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      statusCode: {
        type: Sequelize.STRING
      },
      latePenalty: {
        type: Sequelize.DECIMAL
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
    // Index pour installment_plans
    await queryInterface.addIndex('installment_plans', ['userId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['orderId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['productId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['statusCode'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['startDate'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['endDate'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['planNumber'], { schema: 'kredika_app', unique: true });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('installment_plans', {
      schema: 'kredika_app'
    });
  }
};