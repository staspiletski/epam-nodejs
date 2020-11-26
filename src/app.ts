import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './routes/userRoutes';
import sequelize from './data-access/dataAccess';
import UserModel from './models/user';
import { INIT_USER_DATA } from '../assets/data/initData';
import { groupRouter } from './routes/groupRoutes';
import { userGroupRouter } from './routes/userGroupRoutes';
import { logger } from './logger/logger';
import { errorRouter } from './routes/errorRoutes';
import { loggerFormat } from './logger/utils';
import cors from 'cors';
import { loginRouter } from './routes/loginRouter';
import loginServices from './services/loginServices';
import getLocalStore from './storage/localStorage';
import { getConfig, PORT } from './config';

const localStore = getLocalStore();
getConfig();

export const app: express.Application = express();

const corsOptions = {
  origin: ['http://localhost:4500', 'http://g1.com'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(loggerFormat(req, res));
  next();
});

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.headers['authorization'] = localStore.get('token');
  loginServices.isAuthenticated(req, res, next);
});

app.use(loginRouter, userRouter, groupRouter, userGroupRouter, errorRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Internal Server Error: ${error}`);
  res.status(500).send('Internal Server Error');
});

process
  .on('uncaughtException', (error: Error) => {
    logger.error(`Uncaught Exception: ${error}`);
  })

  .on('unhandledRejection', (error: Error, promise: Promise<any>) => {
    logger.error(`Unhandled Rejection: ${error} ${promise} `);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync().then(() => {
  UserModel.bulkCreate(INIT_USER_DATA, { validate: true, ignoreDuplicates: true })
    .then(() => console.log('Successfully created user data.'))
    .catch(err => {
      console.error('Bulk creation error: ', err);
    });

  app.listen(PORT || 4545, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
});
