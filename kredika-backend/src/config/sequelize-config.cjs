// sequelize-config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
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
    logging: false
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
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
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
    logging: false
  }
};
