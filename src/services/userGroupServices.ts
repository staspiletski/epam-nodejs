import UserModel from '../models/user';
import sequelize from '../data-access/dataAccess';
import GroupModel from '../models/group';
import groupService from './groupServices';

const userGroupService = {
  async readAll() {
    return await GroupModel.findAll();
  },

  async create(groupId: string, userIds: string[]) {
    try {
      await sequelize.transaction(async t => {
        let group: any = await GroupModel.findByPk(groupId);

        if (!group) {
          return null;
        }

        const users: any = await UserModel.findAll({ where: { id: userIds } });

        if (!users) {
          return null;
        }

        await group.addUsers(users, { where: { isDeleted: false }, transaction: t });
        const options = {
          include: [
            {
              model: UserModel,
              as: 'users',
              attributes: ['id', 'login', 'age'],
              where: { isDeleted: false },
            },
          ],
        };
        return await groupService.readGroupById(groupId, options);
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async readGroupById(id: string) {
    try {
      const users = await GroupModel.findByPk(id, {
        include: [
          {
            model: UserModel,
            as: 'users',
            attributes: ['id', 'login', 'age'],
            where: { isDeleted: false },
          },
        ],
      });

      return users;
    } catch (error) {
      console.error(error);
    }
  },

  async readUserById(id: string) {
    try {
      const users = UserModel.findOne({
        where: { id, isDeleted: false },
        include: [
          {
            model: GroupModel,
            as: 'groups',
            attributes: ['id', 'name', 'permissions'],
          },
        ],
      });

      return users;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userGroupService;
