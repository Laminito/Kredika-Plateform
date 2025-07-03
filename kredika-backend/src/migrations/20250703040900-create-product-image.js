'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'products',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      altText: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.INTEGER
      },
      isPrimary: {
        type: Sequelize.BOOLEAN
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
      { tableName: 'product_images', schema: 'kredika_app' },
      ['productId'],
      { name: 'idx_product_images_productId' }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('product_images', {
      schema: 'kredika_app'
    });
  }
};
