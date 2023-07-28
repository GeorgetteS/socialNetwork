import express from 'express';
import http from 'http';

import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './db.js';
import * as models from './models/models.js';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { initSokets } from './websockets/websockets.js';

const app = express();

const server = http.Server(app);

initSokets(server);

dotenv.config();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });

    server.listen(PORT, () => console.log('Запущен на ', PORT));
    console.log();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
