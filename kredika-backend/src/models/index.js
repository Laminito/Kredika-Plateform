import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import UserModel from './user.js';
import ProductModel from './product.js';
import CategoryModel from './category.js';
import InstallmentPlanModel from './installmentplan.js';
import PaymentTransactionModel from './paymenttransaction.js';
import PaymentScheduleModel from './paymentschedule.js';
import OrderModel from './order.js';
import OrderItemModel from './orderitem.js';
import CartModel from './cart.js';
import CartItemModel from './cartitem.js';
import CreditProfileModel from './creditprofile.js';
import UserAddressModel from './useraddress.js';
import ProductImageModel from './productimage.js';
import CodeListModel from './codelist.js';
import { sequelize } from '../config/database.js';

const models = {};

// Initialisation des modèles
models.User = UserModel(sequelize);
models.Product = ProductModel(sequelize);
models.Category = CategoryModel(sequelize);
models.InstallmentPlan = InstallmentPlanModel(sequelize);
models.PaymentTransaction = PaymentTransactionModel(sequelize);
models.PaymentSchedule = PaymentScheduleModel(sequelize);
models.Order = OrderModel(sequelize);
models.OrderItem = OrderItemModel(sequelize);
models.Cart = CartModel(sequelize);
models.CartItem = CartItemModel(sequelize);
models.CreditProfile = CreditProfileModel(sequelize);
models.UserAddress = UserAddressModel(sequelize);
models.ProductImage = ProductImageModel(sequelize);
models.CodeList = CodeListModel(sequelize);

// Configuration des associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;