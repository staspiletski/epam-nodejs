import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../data-access/dataAccess';
import UserModel from './user';
import { PERMISSIONS } from '../../assets/data/initData';

export interface GroupInstance extends Model {
  id?: number;
  name: string;
  permissions: [];
}

const GroupModel = sequelize.define<GroupInstance>(
  'group',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM({ values: [...PERMISSIONS] })),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

GroupModel.belongsToMany(UserModel, {
  through: 'user-group',
});

UserModel.belongsToMany(GroupModel, {
  through: 'user-group',
});

export default GroupModel;
