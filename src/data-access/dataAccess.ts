import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  'postgres://ddbypwqh:hqLwBXP9L9gF9Sfkf5pOZQ2CpQ0eFUr5@lallah.db.elephantsql.com:5432/ddbypwqh',
  {
    dialect: 'postgres',
  },
);

export default sequelize;
