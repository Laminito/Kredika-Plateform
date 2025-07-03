'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'carts',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        onDelete: 'RESTRICT'
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      paymentMethodCode: {
        type: Sequelize.STRING
      },
      creditDuration: {
        type: Sequelize.INTEGER
      },
      creditFrequencyCode: {
        type: Sequelize.STRING
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      commissionRate: {
        type: Sequelize.DECIMAL(5, 4)
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      installmentAmount: {
        type: Sequelize.DECIMAL(10, 2)
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
    }, {
      schema: 'kredika_app'
    });

    // Ajouter les indexes si nécessaire
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'cart_items' },
      ['cartId'],
      { name: 'idx_cart_items_cartId' }
    );
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'cart_items' },
      ['productId'],
      { name: 'idx_cart_items_productId' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items', {
      schema: 'kredika_app'
    });
  }
};