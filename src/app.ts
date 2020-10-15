import express from 'express';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import sequelize from './data-access/dataAccess';
import UserModel from './models/user';
import { INIT_USER_DATA } from '../assets/data/initData';
import { groupRouter } from './routes/groupRoutes';
import GroupModel from './models/group';
import { userGroupRouter } from './routes/userGroupRoutes';

dotenv.config();

const app: express.Application = express();
app.use(express.json());

app.use(userRouter, groupRouter, userGroupRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false }).then(() => {
  UserModel.bulkCreate(INIT_USER_DATA, { validate: true }).then(r =>
    console.log('Successfully created user data.'),
  );

  app.listen(process.env.PORT || 4500, () => {
    console.log(`Listening at http://localhost:${process.env.PORT}`);
  });
});
