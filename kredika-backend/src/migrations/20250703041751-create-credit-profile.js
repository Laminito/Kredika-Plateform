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
        type: Sequelize.UUID
      },
      creditScore: {
        type: Sequelize.INTEGER
      },
      creditLimit: {
        type: Sequelize.DECIMAL
      },
      availableCredit: {
        type: Sequelize.DECIMAL
      },
      totalDebt: {
        type: Sequelize.DECIMAL
      },
      defaultCount: {
        type: Sequelize.INTEGER
      },
      lastCreditReview: {
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
    await queryInterface.dropTable('credit_profiles', {
      schema: 'kredika_app'
    });
  }
};