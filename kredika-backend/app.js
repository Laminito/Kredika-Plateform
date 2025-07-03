import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './src/routes/index.js';
import { errorHandler, notFoundHandler } from './src/middlewares/errorHandlers.js';
import { setupSwagger } from './src/config/swagger.js';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import fs from 'fs';
const keycloakConfig = JSON.parse(fs.readFileSync('./src/config/keycloak.json', 'utf-8'));


const app = express();

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);


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

app.use('/api/v1', routes);

setupSwagger(app);

app.use(notFoundHandler);
app.use(errorHandler);

export { app, keycloak };


