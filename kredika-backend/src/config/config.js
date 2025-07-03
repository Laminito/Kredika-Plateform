// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'kredika_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    schema: 'kredika_app',
    dialectOptions: {
      prependSearchPath: true,
    },
    define: {
      schema: 'kredika_app',
      timestamps: true,
      underscored: false,
    },
    logging: console.log,
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME ? `${process.env.DB_NAME}_test` : 'kredika_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    schema: 'kredika_app',
    dialectOptions: {
      prependSearchPath: true,
    },
    define: {
      schema: 'kredika_app',
      timestamps: true,
      underscored: false,
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    schema: 'kredika_app',
    dialectOptions: {
      prependSearchPath: true,
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    define: {
      schema: 'kredika_app',
      timestamps: true,
      underscored: false,
    },
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

export { sequelize, config };
export default sequelize;