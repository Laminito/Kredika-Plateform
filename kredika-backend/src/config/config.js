// config/config.js
module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: 'kredika-db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    schema: 'kredika_app', // Définir le schéma par défaut
    dialectOptions: {
      prependSearchPath: true, // Ajouter le schéma au search_path
    },
    define: {
      schema: 'kredika_app', // Schéma par défaut pour tous les modèles
      timestamps: true,
      underscored: false, // Utilise camelCase au lieu de snake_case
    },
    logging: console.log, // Activer les logs SQL en développement
  },
  test: {
    username: process.env.DB_USERNAME || 'your_username',
    password: process.env.DB_PASSWORD || 'your_password',
    database: 'kredika-db-test',
    host: process.env.DB_HOST || '127.0.0.1',
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
    logging: false, // Désactiver les logs en test
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'kredika-db',
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
    logging: false, // Désactiver les logs en production
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};