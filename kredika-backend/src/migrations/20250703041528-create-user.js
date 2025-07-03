'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      nationalId: {
        type: Sequelize.STRING
      },
      profession: {
        type: Sequelize.STRING
      },
      monthlyIncome: {
        type: Sequelize.DECIMAL
      },
      roleCode: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      emailVerified: {
        type: Sequelize.BOOLEAN
      },
      phoneVerified: {
        type: Sequelize.BOOLEAN
      },
      keycloakId: {
        type: Sequelize.STRING
      },
      statusCode: {
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
    },{
      schema: 'kredika_app'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users', {
      schema: 'kredika_app'
    });
  }
};