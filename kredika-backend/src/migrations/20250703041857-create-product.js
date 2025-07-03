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
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      shortDescription: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      comparePrice: {
        type: Sequelize.DECIMAL
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      sku: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      minStock: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      dimensions: {
        type: Sequelize.JSON
      },
      categoryId: {
        type: Sequelize.UUID
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      warranty: {
        type: Sequelize.INTEGER
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      creditEligible: {
        type: Sequelize.BOOLEAN
      },
      minCreditAmount: {
        type: Sequelize.DECIMAL
      },
      maxCreditDuration: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.JSON
      },
      seoTitle: {
        type: Sequelize.STRING
      },
      seoDescription: {
        type: Sequelize.TEXT
      },
      slug: {
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