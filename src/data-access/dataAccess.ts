import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  'postgres://ddbypwqh:hqLwBXP9L9gF9Sfkf5pOZQ2CpQ0eFUr5@lallah.db.elephantsql.com:5432/ddbypwqh',
  {
    dialect: 'postgres',
  },
);

/*const db: any = {
  Users: sequelize.import('../models/user'),
};
/!*

/!*Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});*!/

db.sequelize = sequelize;
db.Sequelize = Sequelize;*/

export default sequelize;
