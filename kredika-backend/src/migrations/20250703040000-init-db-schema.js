'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Créer le schéma "kredika_app" si non existant
        await queryInterface.sequelize.query(`
      CREATE SCHEMA IF NOT EXISTS kredika_app;
    `);
    },
};
