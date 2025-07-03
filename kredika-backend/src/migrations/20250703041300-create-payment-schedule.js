'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_schedules', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      installmentPlanId: {
        type: Sequelize.UUID,
        allowNull: false,
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
      installmentNumber: {
        type: Sequelize.INTEGER
      },
      dueDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      paidAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      penaltyAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      statusCode: {
        type: Sequelize.STRING
      },
      paidAt: {
        type: Sequelize.DATE
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

    await queryInterface.addIndex(
      { tableName: 'payment_schedules', schema: 'kredika_app' },
      ['installmentPlanId'],
      { name: 'idx_payment_schedules_planId' }
    );
    await queryInterface.addIndex(
      { tableName: 'payment_schedules', schema: 'kredika_app' },
      ['dueDate'],
      { name: 'idx_payment_schedules_dueDate' }
    );
    await queryInterface.addIndex(
      { tableName: 'payment_schedules', schema: 'kredika_app' },
      ['statusCode'],
      { name: 'idx_payment_schedules_statusCode' }
    );
    await queryInterface.addIndex(
      { tableName: 'payment_schedules', schema: 'kredika_app' },
      ['isDeleted'],
      { name: 'idx_payment_schedules_isDeleted' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_schedules', {
      schema: 'kredika_app'
    });
  }
};
