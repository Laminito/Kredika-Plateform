'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credit_profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      creditScore: {
        type: Sequelize.INTEGER
      },
      creditLimit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      availableCredit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalDebt: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      defaultCount: {
        type: Sequelize.INTEGER
      },
      lastCreditReview: {
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
      { tableName: 'credit_profiles', schema: 'kredika_app' },
      ['userId'],
      { name: 'idx_credit_profiles_userId' }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('credit_profiles', {
      schema: 'kredika_app'
    });
  }
};
