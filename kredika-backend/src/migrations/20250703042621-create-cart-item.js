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
  quantity: Sequelize.INTEGER,
  paymentMethodCode: Sequelize.STRING,
  creditDuration: Sequelize.INTEGER,
  creditFrequencyCode: Sequelize.STRING,
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
