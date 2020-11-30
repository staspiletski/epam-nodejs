import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config';

const sequelize = new Sequelize(DATABASE_URL as string, {
  dialect: 'postgres',
});

export default sequelize;
