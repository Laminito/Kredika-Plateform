'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('code_lists', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      position: {
        type: Sequelize.INTEGER
      },
      metadata: {
        type: Sequelize.JSON
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
    await queryInterface.addIndex({ tableName: 'code_lists', schema: 'kredika_app' }, ['type']);
    await queryInterface.addIndex({ tableName: 'code_lists', schema: 'kredika_app' }, ['code']);
    await queryInterface.addIndex({ tableName: 'code_lists', schema: 'kredika_app' }, ['type', 'code'], {
      name: 'idx_unique_type_code',
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('code_lists', {
      schema: 'kredika_app'
    });
  }
};
