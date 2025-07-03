'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      tableName: 'code_lists',
      schema: 'kredika_app'
    }, [
      // Rôles utilisateurs
      { type: 'USER_ROLE', code: 'ADMIN', value: 'admin', label: 'Administrateur', isActive: true, position: 1, isDeleted: false },
      { type: 'USER_ROLE', code: 'CUSTOMER', value: 'customer', label: 'Client', isActive: true, position: 2, isDeleted: false },
      { type: 'USER_ROLE', code: 'MERCHANT', value: 'merchant', label: 'Marchand', isActive: true, position: 3, isDeleted: false },
      
      // Statuts utilisateurs
      { type: 'USER_STATUS', code: 'ACTIVE', value: 'active', label: 'Actif', isActive: true, position: 1, isDeleted: false },
      { type: 'USER_STATUS', code: 'INACTIVE', value: 'inactive', label: 'Inactif', isActive: true, position: 2, isDeleted: false },
      { type: 'USER_STATUS', code: 'SUSPENDED', value: 'suspended', label: 'Suspendu', isActive: true, position: 3, isDeleted: false },
      
      // Types d'adresses
      { type: 'ADDRESS_TYPE', code: 'HOME', value: 'home', label: 'Domicile', isActive: true, position: 1, isDeleted: false },
      { type: 'ADDRESS_TYPE', code: 'WORK', value: 'work', label: 'Travail', isActive: true, position: 2, isDeleted: false },
      { type: 'ADDRESS_TYPE', code: 'DELIVERY', value: 'delivery', label: 'Livraison', isActive: true, position: 3, isDeleted: false },
      
      // Statuts de panier
      { type: 'CART_STATUS', code: 'ACTIVE', value: 'active', label: 'Actif', isActive: true, position: 1, isDeleted: false },
      { type: 'CART_STATUS', code: 'EXPIRED', value: 'expired', label: 'Expiré', isActive: true, position: 2, isDeleted: false },
      { type: 'CART_STATUS', code: 'CONVERTED', value: 'converted', label: 'Converti', isActive: true, position: 3, isDeleted: false },
      
      // Méthodes de paiement
      { type: 'PAYMENT_METHOD', code: 'CASH', value: 'cash', label: 'Espèces', isActive: true, position: 1, isDeleted: false },
      { type: 'PAYMENT_METHOD', code: 'CREDIT', value: 'credit', label: 'Crédit', isActive: true, position: 2, isDeleted: false },
      { type: 'PAYMENT_METHOD', code: 'MOBILE_MONEY', value: 'mobile_money', label: 'Mobile Money', isActive: true, position: 3, isDeleted: false },
      
      // Fréquences de crédit
      { type: 'CREDIT_FREQUENCY', code: 'WEEKLY', value: 'weekly', label: 'Hebdomadaire', isActive: true, position: 1, isDeleted: false },
      { type: 'CREDIT_FREQUENCY', code: 'MONTHLY', value: 'monthly', label: 'Mensuel', isActive: true, position: 2, isDeleted: false },
      { type: 'CREDIT_FREQUENCY', code: 'QUARTERLY', value: 'quarterly', label: 'Trimestriel', isActive: true, position: 3, isDeleted: false },
      
      // Statuts de commande
      { type: 'ORDER_STATUS', code: 'PENDING', value: 'pending', label: 'En attente', isActive: true, position: 1, isDeleted: false },
      { type: 'ORDER_STATUS', code: 'CONFIRMED', value: 'confirmed', label: 'Confirmée', isActive: true, position: 2, isDeleted: false },
      { type: 'ORDER_STATUS', code: 'SHIPPED', value: 'shipped', label: 'Expédiée', isActive: true, position: 3, isDeleted: false },
      { type: 'ORDER_STATUS', code: 'DELIVERED', value: 'delivered', label: 'Livrée', isActive: true, position: 4, isDeleted: false },
      { type: 'ORDER_STATUS', code: 'CANCELLED', value: 'cancelled', label: 'Annulée', isActive: true, position: 5, isDeleted: false },
      
      // Statuts de paiement
      { type: 'PAYMENT_STATUS', code: 'PENDING', value: 'pending', label: 'En attente', isActive: true, position: 1, isDeleted: false },
      { type: 'PAYMENT_STATUS', code: 'PAID', value: 'paid', label: 'Payé', isActive: true, position: 2, isDeleted: false },
      { type: 'PAYMENT_STATUS', code: 'PARTIAL', value: 'partial', label: 'Partiel', isActive: true, position: 3, isDeleted: false },
      { type: 'PAYMENT_STATUS', code: 'FAILED', value: 'failed', label: 'Échoué', isActive: true, position: 4, isDeleted: false },
      
      // Statuts de plan d'échelonnement
      { type: 'INSTALLMENT_STATUS', code: 'ACTIVE', value: 'active', label: 'Actif', isActive: true, position: 1, isDeleted: false },
      { type: 'INSTALLMENT_STATUS', code: 'COMPLETED', value: 'completed', label: 'Terminé', isActive: true, position: 2, isDeleted: false },
      { type: 'INSTALLMENT_STATUS', code: 'DEFAULTED', value: 'defaulted', label: 'En défaut', isActive: true, position: 3, isDeleted: false },
      { type: 'INSTALLMENT_STATUS', code: 'SUSPENDED', value: 'suspended', label: 'Suspendu', isActive: true, position: 4, isDeleted: false },
      
      // Statuts de transaction
      { type: 'TRANSACTION_STATUS', code: 'PENDING', value: 'pending', label: 'En attente', isActive: true, position: 1, isDeleted: false },
      { type: 'TRANSACTION_STATUS', code: 'SUCCESS', value: 'success', label: 'Réussie', isActive: true, position: 2, isDeleted: false },
      { type: 'TRANSACTION_STATUS', code: 'FAILED', value: 'failed', label: 'Échouée', isActive: true, position: 3, isDeleted: false },
      { type: 'TRANSACTION_STATUS', code: 'REFUNDED', value: 'refunded', label: 'Remboursée', isActive: true, position: 4, isDeleted: false }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({
      tableName: 'code_lists',
      schema: 'kredika_app'
    }, null, {});
  }
};
