import UserModel from '../models/user';

type User = {
  id?: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean | false;
};

const db = new Map<string, User>();

const userService = {
  async create(user: User) {
    const { login, password, age, isDeleted } = user;
    const newUser = await UserModel.create({
      login: login,
      password: password,
      age: age,
      isDeleted: isDeleted,
    });
    return newUser;
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
    return await deletedUser.update({ isDeleted: true });
  },
};

export default userService;
