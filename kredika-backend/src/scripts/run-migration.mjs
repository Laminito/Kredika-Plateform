// src/scripts/run-migration.mjs
import SequelizeLib from 'sequelize';
const { Sequelize } = SequelizeLib;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

dotenv.config();

// Gérer __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Récupérer le nom de la migration depuis la ligne de commande
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Veuillez fournir le nom de la migration :');
  console.error('   Exemple : npm run migrate:one 20250703040100-create-code-list.js');
  process.exit(1);
}

const migrationPath = path.resolve(__dirname, '../migrations', migrationName);
let migration;

try {
  migration = await import(`file://${migrationPath}`);
} catch (e) {
  console.error(`❌ Impossible de charger la migration "${migrationName}" :`, e);
  process.exit(1);
}

// Connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME || 'kredika_db',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('🔗 Connexion à la base de données réussie');

  const queryInterface = sequelize.getQueryInterface();
  if (typeof migration.up !== 'function') {
    throw new Error('La fonction `up` n\'existe pas dans ce fichier de migration.');
  }

  await migration.up(queryInterface, Sequelize);
  console.log(`✅ Migration "${migrationName}" exécutée avec succès.`);
  process.exit(0);
} catch (error) {
  console.error(`❌ Échec de la migration "${migrationName}" :\n`, error);
  process.exit(1);
}
