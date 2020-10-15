import GroupModel from '../models/group';

type Group = {
  id?: string;
  name: string;
  permissions: [];
};

const groupService = {
  async create(group: Group) {
    const { name, permissions } = group;
    return await GroupModel.create({
      name: name,
      permissions: permissions,
    });
  },

  async readAll() {
    return await GroupModel.findAll();
  },

  async readGroupById(id: string, options: object = {}) {
    return await GroupModel.findByPk(id, { ...options });
  },

  async update(id: string, group: Group) {
    const { name, permissions } = group;
    return await GroupModel.update({ name: name, permissions: permissions }, { where: { id: id } });
  },

  async delete(id: string) {
    const deletedGroup = await GroupModel.findByPk(id);
    if (!deletedGroup) {
      return null;
    }
    return await deletedGroup.destroy();
  },
};

export default groupService;
