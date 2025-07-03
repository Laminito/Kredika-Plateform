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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('installment_plans', {
      schema: 'kredika_app'
    });
  }
};