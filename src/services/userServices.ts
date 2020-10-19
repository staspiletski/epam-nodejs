import UserModel from '../models/user';

type User = {
  id?: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean | false;
};

const userService = {
  async create(user: User) {
    try {
      const { login, password, age, isDeleted } = user;
      return await UserModel.create({
        login: login,
        password: password,
        age: age,
        isDeleted: isDeleted,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async readAll() {
    return await UserModel.findAll({ where: { isDeleted: false } });
  },

  async readUserById(id: string) {
    return await UserModel.findByPk(id);
  },

  // example : { "login": "lll123AAA", "password": "123xzcxAAAcsd","age": 50,"isDeleted": false }
  async update(id: string, user: User) {
    const { login, password, age, isDeleted } = user;
    return await UserModel.update(
      { login: login, password: password, age: age, isDeleted: isDeleted },
      { where: { id: id } },
    );
  },

  async delete(id: string) {
    const deletedUser = await UserModel.findByPk(id);
    if (!deletedUser) {
      return null;
    }
    return await deletedUser.destroy();
  },
};

export default userService;
