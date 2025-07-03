import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './src/routes/index.js';
import { errorHandler, notFoundHandler } from './src/middlewares/errorHandlers.js';
import { setupSwagger } from './src/config/swagger.js';
import session from 'express-session';
import Keycloak from 'keycloak-connect';

const app = express();

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use('/api', routes);

setupSwagger(app);

app.use(notFoundHandler);
app.use(errorHandler);

export { app, keycloak };


// kredika-backend/server.js
import { app } from './app.js';
import { sequelize } from './src/config/database.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();