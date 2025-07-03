'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      shortDescription: {
        type: Sequelize.STRING(500)
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      comparePrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2)
      },
      sku: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      minStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      weight: {
        type: Sequelize.DECIMAL(8, 2)
      },
      dimensions: {
        type: Sequelize.JSON
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'categories',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      brand: {
        type: Sequelize.STRING(100)
      },
      model: {
        type: Sequelize.STRING(100)
      },
      color: {
        type: Sequelize.STRING(50)
      },
      warranty: {
        type: Sequelize.INTEGER,
        comment: 'Warranty in months'
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      creditEligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      minCreditAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      maxCreditDuration: {
        type: Sequelize.INTEGER,
        comment: 'Maximum credit duration in months'
      },
      tags: {
        type: Sequelize.JSON
      },
      seoTitle: {
        type: Sequelize.STRING(200)
      },
      seoDescription: {
        type: Sequelize.TEXT
      },
      slug: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
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
    await Promise.all([
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['categoryId'],
        { name: 'idx_products_categoryId' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['sku'],
        { name: 'idx_products_sku', unique: true }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['slug'],
        { name: 'idx_products_slug', unique: true }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['isActive'],
        { name: 'idx_products_isActive' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['isFeatured'],
        { name: 'idx_products_isFeatured' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['creditEligible'],
        { name: 'idx_products_creditEligible' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['isDeleted'],
        { name: 'idx_products_isDeleted' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['price'],
        { name: 'idx_products_price' }
      ),
      queryInterface.addIndex(
        { tableName: 'products', schema: 'kredika_app' },
        ['brand'],
        { name: 'idx_products_brand' }
      )
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products', {
      schema: 'kredika_app'
    });
  }
};
