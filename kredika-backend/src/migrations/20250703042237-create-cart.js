'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        schema: 'kredika_app',
        tableName: 'carts'
      },
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: true,
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
        statusCode: {
          type: Sequelize.STRING
        },
        totalAmount: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0
        },
        expiresAt: {
          type: Sequelize.DATE
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );

    // Ajout d'index
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'carts' },
      ['userId'],
      { name: 'idx_carts_userId' }
    );
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'carts' },
      ['statusCode'],
      { name: 'idx_carts_statusCode' }
    );
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'carts' },
      ['isDeleted'],
      { name: 'idx_carts_isDeleted' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts', {
      schema: 'kredika_app'
    });
  }
};
