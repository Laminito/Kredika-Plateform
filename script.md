# Commandes Sequelize CLI pour Kredika - Version Améliorée

## Configuration du projet
```bash
# Initialiser Sequelize (si pas déjà fait)
npx sequelize-cli init

# Configuration dans config/config.json pour PostgreSQL
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "kredika-db",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "schema": "kredika_app",
    "define": {
      "schema": "kredika_app"
    }
  }
}
```

## Configuration des modèles avec schéma
Chaque modèle généré devra être modifié pour inclure le schéma :

```javascript
// Dans chaque fichier modèle généré
module.exports = (sequelize, DataTypes) => {
  const ModelName = sequelize.define('ModelName', {
    // attributs...
  }, {
    schema: 'kredika_app',
    tableName: 'ModelNames' // nom de la table au pluriel
  });
  
  return ModelName;
};
```

## =================================
## MODÈLES DE BASE (sans dépendances)
## =================================

### CodeList - Table de référence pour remplacer les ENUM
```bash
npx sequelize-cli model:generate --name CodeList --attributes type:string,code:string,value:string,label:string,description:text,isActive:boolean,position:integer,metadata:json,isDeleted:boolean --force
```

### Category
```bash
npx sequelize-cli model:generate --name Category --attributes name:string,description:text,slug:string,imageUrl:string,parentId:uuid,position:integer,isActive:boolean,seoTitle:string,seoDescription:text,isDeleted:boolean --force
```

## =================================
## MODÈLE USER
## =================================

### User (modèle principal)
```bash
npx sequelize-cli model:generate --name User --attributes fullName:string,email:string,phoneNumber:string,dateOfBirth:date,nationalId:string,profession:string,monthlyIncome:decimal,roleCode:string,isVerified:boolean,emailVerified:boolean,phoneVerified:boolean,keycloakId:string,statusCode:string,isDeleted:boolean --force
```

### UserAddress
```bash
npx sequelize-cli model:generate --name UserAddress --attributes userId:uuid,typeCode:string,street:string,city:string,region:string,postalCode:string,country:string,isDefault:boolean,isDeleted:boolean --force
```

### CreditProfile
```bash
npx sequelize-cli model:generate --name CreditProfile --attributes userId:uuid,creditScore:integer,creditLimit:decimal,availableCredit:decimal,totalDebt:decimal,defaultCount:integer,lastCreditReview:date,isDeleted:boolean --force
```

## =================================
## MODÈLES PRODUIT
## =================================

### Product
```bash
npx sequelize-cli model:generate --name Product --attributes name:string,description:text,shortDescription:string,price:decimal,comparePrice:decimal,cost:decimal,sku:string,stock:integer,minStock:integer,weight:decimal,dimensions:json,categoryId:uuid,brand:string,model:string,color:string,warranty:integer,isFeatured:boolean,isActive:boolean,creditEligible:boolean,minCreditAmount:decimal,maxCreditDuration:integer,tags:json,seoTitle:string,seoDescription:text,slug:string,isDeleted:boolean --force
```

### ProductImage
```bash
npx sequelize-cli model:generate --name ProductImage --attributes productId:uuid,imageUrl:string,altText:string,position:integer,isPrimary:boolean,isDeleted:boolean --force
```

## =================================
## MODÈLES PANIER
## =================================

### Cart
```bash
npx sequelize-cli model:generate --name Cart --attributes userId:uuid,statusCode:string,expiresAt:date,isDeleted:boolean --force
```

### CartItem
```bash
npx sequelize-cli model:generate --name CartItem --attributes cartId:uuid,productId:uuid,quantity:integer,paymentMethodCode:string,creditDuration:integer,creditFrequencyCode:string,commissionRate:decimal,totalAmount:decimal,installmentAmount:decimal,isDeleted:boolean --force
```

## =================================
## MODÈLES COMMANDE
## =================================

### Order
```bash
npx sequelize-cli model:generate --name Order --attributes orderNumber:string,userId:uuid,deliveryAddressId:uuid,totalAmount:decimal,statusCode:string,paymentStatusCode:string,notes:text,deliveryDate:date,completedAt:date,isDeleted:boolean --force
```

### OrderItem
```bash
npx sequelize-cli model:generate --name OrderItem --attributes orderId:uuid,productId:uuid,quantity:integer,unitPrice:decimal,totalPrice:decimal,paymentMethodCode:string,isDeleted:boolean --force
```

## =================================
## MODÈLES PAIEMENT
## =================================

### InstallmentPlan
```bash
npx sequelize-cli model:generate --name InstallmentPlan --attributes planNumber:string,userId:uuid,orderId:uuid,productId:uuid,principalAmount:decimal,commissionRate:decimal,commissionAmount:decimal,totalAmount:decimal,installmentAmount:decimal,durationMonths:integer,frequencyCode:string,totalInstallments:integer,paidInstallments:integer,startDate:date,endDate:date,statusCode:string,latePenalty:decimal,completedAt:date,isDeleted:boolean --force
```

### PaymentSchedule
```bash
npx sequelize-cli model:generate --name PaymentSchedule --attributes installmentPlanId:uuid,installmentNumber:integer,dueDate:date,amount:decimal,paidAmount:decimal,penaltyAmount:decimal,statusCode:string,paidAt:date,isDeleted:boolean --force
```

### PaymentTransaction
```bash
npx sequelize-cli model:generate --name PaymentTransaction --attributes transactionNumber:string,userId:uuid,installmentPlanId:uuid,paymentScheduleId:uuid,amount:decimal,paymentMethodCode:string,externalTransactionId:string,gatewayResponse:json,statusCode:string,processedAt:date,failureReason:text,refundedAt:date,refundAmount:decimal,isDeleted:boolean --force
```

## =================================
## SEEDERS POUR LES CODELISTS
## =================================

### Créer un seeder pour les CodeLists
```bash
npx sequelize-cli seed:generate --name initial-codelists
```

### Contenu du seeder (à ajouter manuellement dans le fichier généré) :
```javascript
// Dans le fichier seeder généré
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({
      tableName: 'CodeLists',
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
      tableName: 'CodeLists',
      schema: 'kredika_app'
    }, null, {});
  }
};
```

## =================================
## COMMANDES UTILES
## =================================

### Migration et base de données
```bash
# Vérifier les migrations
npx sequelize-cli migration:status

# Exécuter les migrations
npx sequelize-cli db:migrate

# Annuler la dernière migration
npx sequelize-cli db:migrate:undo

# Annuler toutes les migrations
npx sequelize-cli db:migrate:undo:all

# Créer la base de données
npx sequelize-cli db:create

# Supprimer la base de données
npx sequelize-cli db:drop
```

### Seeders
```bash
# Créer un seeder
npx sequelize-cli seed:generate --name demo-data

# Exécuter les seeders
npx sequelize-cli db:seed:all

# Exécuter un seeder spécifique
npx sequelize-cli db:seed --seed name-of-seed-file

# Annuler tous les seeders
npx sequelize-cli db:seed:undo:all
```

## =================================
## MODIFICATIONS POST-GÉNÉRATION
## =================================

### 1. Configuration des migrations
Après génération, vous devrez modifier chaque migration pour :

#### A. Ajouter le schéma dans les migrations
```javascript
// Au début de chaque migration
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ModelNames', {
      // attributs...
    }, {
      schema: 'kredika_app'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ModelNames', {
      schema: 'kredika_app'
    });
  }
};
```

#### B. Configurer les UUID comme clés primaires
```javascript
// Dans chaque migration
id: {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true
}
```

#### C. Spécifier la précision des décimaux
```javascript
// Pour les montants
price: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: false
}
```

#### D. Ajouter les clés étrangères
```javascript
// Exemple pour userId
userId: {
  type: Sequelize.UUID,
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
}
```

#### E. Ajouter les index
```javascript
// À la fin de chaque migration
await queryInterface.addIndex('ModelNames', ['columnName'], {
  schema: 'kredika_app'
});
await queryInterface.addIndex('ModelNames', ['column1', 'column2'], {
  schema: 'kredika_app'
}); // Index composé
```

### 2. Configuration des associations dans les modèles
```javascript
// Exemple dans le modèle User
static associate(models) {
  User.hasMany(models.Order, { foreignKey: 'userId' });
  User.hasOne(models.CreditProfile, { foreignKey: 'userId' });
  User.hasMany(models.UserAddress, { foreignKey: 'userId' });
}
```

### 3. Ajout des scopes pour la suppression logique
```javascript
// Dans chaque modèle
static init(sequelize, DataTypes) {
  return super.init({
    // ... autres attributs
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ModelName',
    defaultScope: {
      where: {
        isDeleted: false
      }
    },
    scopes: {
      withDeleted: {
        where: {}
      },
      onlyDeleted: {
        where: {
          isDeleted: true
        }
      }
    }
  });
}
```

## =================================
## REMARQUES IMPORTANTES
## =================================

### Avantages de cette approche :
1. **Flexibilité** : Les codes peuvent être modifiés sans migration
2. **Extensibilité** : Facile d'ajouter de nouveaux types de codes
3. **Maintenance** : Gestion centralisée des références
4. **Suppression logique** : Préservation des données historiques
5. **Performance** : Index sur les codes fréquemment utilisés

### Ordre d'exécution recommandé :
1. CodeList (en premier - table de référence)
2. Category, User (modèles principaux)
3. UserAddress, CreditProfile (dépendent de User)
4. Product, ProductImage (dépendent de Category)
5. Cart, CartItem (dépendent de User et Product)
6. Order, OrderItem (dépendent de User et Product)
7. InstallmentPlan, PaymentSchedule, PaymentTransaction (dépendent des commandes)

### Configuration supplémentaire :
- Ajoutez des validations dans les modèles
- Configurez les hooks pour la suppression logique  
- Ajoutez des méthodes d'instance pour les opérations courantes
- Configurez les index pour les performances
- **Important** : Tous les modèles et migrations doivent spécifier le schéma `kredika_app`