

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import UserModel from './user.js';
import ProductModel from './product.js';
import CategoryModel from './category.js';
import InstallmentPlanModel from './installmentplan.js';
import PaymentTransactionModel from './paymenttransaction.js';
import CodeListModel from './codelist.js';
import { sequelize } from '../config/database.js';

const models = {};

models.User = UserModel(sequelize);
models.Product = ProductModel(sequelize);
models.Category = CategoryModel(sequelize);
models.InstallmentPlan = InstallmentPlanModel(sequelize);
models.PaymentTransaction = PaymentTransactionModel(sequelize);
models.CodeList = CodeListModel(sequelize);

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
