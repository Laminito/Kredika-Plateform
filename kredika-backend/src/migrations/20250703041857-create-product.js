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
        type: Sequelize.TEXT,
        allowNull: true
      },
      shortDescription: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      comparePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
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
        type: Sequelize.DECIMAL(8, 2),
        allowNull: true
      },
      dimensions: {
        type: Sequelize.JSON,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      brand: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      warranty: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      maxCreditDuration: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Maximum credit duration in months'
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true
      },
      seoTitle: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      seoDescription: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('products', {
      schema: 'kredika_app'
    });
  }
};