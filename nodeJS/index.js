import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import sequelize from './db.js';
import router from './routes/index.js';
import * as models from './models/models.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });

    app.listen(PORT, () => console.log('Запущен на ', PORT));
    console.log();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
