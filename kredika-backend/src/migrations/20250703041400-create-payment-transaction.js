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
        type: Sequelize.STRING,
        unique: true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      installmentPlanId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'installment_plans',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paymentScheduleId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'payment_schedules',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      schema: 'kredika_app'
    });

    // Indexes
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['userId']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['installmentPlanId']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['paymentScheduleId']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['statusCode']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['transactionNumber'], { unique: true });
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['externalTransactionId']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['processedAt']);
    await queryInterface.addIndex({ tableName: 'payment_transactions', schema: 'kredika_app' }, ['isDeleted']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_transactions', {
      schema: 'kredika_app'
    });
  }
};
