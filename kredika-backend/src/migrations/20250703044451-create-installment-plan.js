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
        type: Sequelize.STRING
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
      orderId: {
        type: Sequelize.UUID,
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
        type: Sequelize.INTEGER
      },
      frequencyCode: {
        type: Sequelize.STRING
      },
      totalInstallments: {
        type: Sequelize.INTEGER
      },
      paidInstallments: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      statusCode: {
        type: Sequelize.STRING
      },
      latePenalty: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0.00
      },
      completedAt: {
        type: Sequelize.DATE
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
    await queryInterface.addIndex('installment_plans', ['userId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['orderId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['productId'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['statusCode'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['startDate'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['endDate'], { schema: 'kredika_app' });
    await queryInterface.addIndex('installment_plans', ['planNumber'], {
      schema: 'kredika_app',
      unique: true
    });
    await queryInterface.addIndex('installment_plans', ['isDeleted'], {
      schema: 'kredika_app',
      name: 'idx_installment_plans_isDeleted'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('installment_plans', {
      schema: 'kredika_app'
    });
  }
};
