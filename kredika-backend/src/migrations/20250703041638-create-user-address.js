'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
      typeCode: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    // Indexes recommandés
    await queryInterface.addIndex({ tableName: 'user_addresses', schema: 'kredika_app' }, ['userId']);
    await queryInterface.addIndex({ tableName: 'user_addresses', schema: 'kredika_app' }, ['isDeleted']);
    await queryInterface.addIndex({ tableName: 'user_addresses', schema: 'kredika_app' }, ['isDefault']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_addresses', {
      schema: 'kredika_app'
    });
  }
};
