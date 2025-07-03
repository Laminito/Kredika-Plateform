'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('installment_plans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      planNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
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
      orderId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: {
            tableName: 'orders',
            schema: 'kredika_app'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
        onDelete: 'SET NULL'
      },
      principalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      commissionRate: {
        type: Sequelize.DECIMAL(5, 4),
        allowNull: false,
        comment: 'Commission rate as percentage (e.g., 0.1250 for 12.50%)'
      },
      commissionAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      installmentAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      durationMonths: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      frequencyCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalInstallments: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paidInstallments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      statusCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      latePenalty: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Indexes - syntaxe correcte avec schéma
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['userId'],
      { name: 'idx_installment_plans_userId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['orderId'],
      { name: 'idx_installment_plans_orderId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['productId'],
      { name: 'idx_installment_plans_productId' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['statusCode'],
      { name: 'idx_installment_plans_statusCode' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['startDate'],
      { name: 'idx_installment_plans_startDate' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['endDate'],
      { name: 'idx_installment_plans_endDate' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['planNumber'],
      { name: 'idx_installment_plans_planNumber', unique: true }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['isDeleted'],
      { name: 'idx_installment_plans_isDeleted' }
    );

    // Index composé pour les requêtes fréquentes
    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['userId', 'statusCode'],
      { name: 'idx_installment_plans_userId_statusCode' }
    );

    await queryInterface.addIndex(
      { schema: 'kredika_app', tableName: 'installment_plans' },
      ['orderId', 'statusCode'],
      { name: 'idx_installment_plans_orderId_statusCode' }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('installment_plans', {
      schema: 'kredika_app'
    });
  }
};