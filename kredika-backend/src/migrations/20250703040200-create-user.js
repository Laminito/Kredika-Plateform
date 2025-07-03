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
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      nationalId: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true
      },
      profession: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      monthlyIncome: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      roleCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'CUSTOMER'
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      phoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      keycloakId: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true
      },
      statusCode: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      schema: 'kredika_app'
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users', {
      schema: 'kredika_app'
    });
  }
};