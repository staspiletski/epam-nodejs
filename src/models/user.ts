import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../data-access/dataAccess';

interface UserInstance extends Model {
  id?: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

const UserModel = sequelize.define<UserInstance>(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    login: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
  },
);

export default UserModel;
