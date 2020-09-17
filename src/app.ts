import express from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import sequelize from './data-access/dataAccess';
import UserModel from './models/user';
import { INIT_DATA } from '../assets/data/initData';

dotenv.config();

const app: express.Application = express();

app.use(userRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('@@@ Connection has been established successfully.');
  })
  .catch(err => {
    console.error('@@@ Unable to connect to the database:', err);
  });

sequelize.sync({ force: true }).then(() => {
  UserModel.bulkCreate(INIT_DATA, { returning: true, validate: true }).then(r =>
    console.log('@@@ ', r),
  );

  app.listen(process.env.PORT, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  });
});
