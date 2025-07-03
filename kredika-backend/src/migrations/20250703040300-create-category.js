'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'categories',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      position: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      seoTitle: {
        type: Sequelize.STRING
      },
      seoDescription: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex({ tableName: 'categories', schema: 'kredika_app' }, ['slug']);
    await queryInterface.addIndex({ tableName: 'categories', schema: 'kredika_app' }, ['parentId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categories', {
      schema: 'kredika_app'
    });
  }
};
