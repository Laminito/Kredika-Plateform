4. Index à ajouter sur les autres tables
InstallmentPlans
javascript// Index pour installment_plans
await queryInterface.addIndex('installment_plans', ['userId'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['orderId'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['productId'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['statusCode'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['startDate'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['endDate'], { schema: 'kredika_app' });
await queryInterface.addIndex('installment_plans', ['planNumber'], { schema: 'kredika_app', unique: true });

PaymentTransactions
javascript// Index pour payment_transactions
await queryInterface.addIndex('payment_transactions', ['userId'], { schema: 'kredika_app' });
await queryInterface.addIndex('payment_transactions', ['installmentPlanId'], { schema: 'kredika_app' });
await queryInterface.addIndex('payment_transactions', ['paymentScheduleId'], { schema: 'kredika_app' });
await queryInterface.addIndex('payment_transactions', ['statusCode'], { schema: 'kredika_app' });
await queryInterface.addIndex('payment_transactions', ['transactionNumber'], { schema: 'kredika_app', unique: true });
await queryInterface.addIndex('payment_transactions', ['externalTransactionId'], { schema: 'kredika_app' });
await queryInterface.addIndex('payment_transactions', ['processedAt'], { schema: 'kredika_app' });

Orders
javascript// Index pour orders
await queryInterface.addIndex('orders', ['userId'], { schema: 'kredika_app' });
await queryInterface.addIndex('orders', ['deliveryAddressId'], { schema: 'kredika_app' });
await queryInterface.addIndex('orders', ['statusCode'], { schema: 'kredika_app' });
await queryInterface.addIndex('orders', ['paymentStatusCode'], { schema: 'kredika_app' });
await queryInterface.addIndex('orders', ['orderNumber'], { schema: 'kredika_app', unique: true });
await queryInterface.addIndex('orders', ['deliveryDate'], { schema: 'kredika_app' });