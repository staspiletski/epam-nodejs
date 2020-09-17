import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/user';

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean | false;
};

const db = new Map<string, User>();

const userService = {
  create(user: User): User {
    const id = uuidv4();
    const newUser = { ...user, id: id, isDeleted: false };
    db.set(id, newUser);
    return newUser;
  },

  async readAll() {
    const users = await UserModel.findAll({ where: { isDeleted: false } });
    return users;
  },

  /*  readSuggested(substring: string, limit: number) {
    const allUsers = userService.readAll();
    const filteredUsers = allUsers.filter(user => user.login.includes(substring));
    const sortedUsers = filteredUsers.sort((user1, user2) =>
      user1.login.localeCompare(user2.login),
    );

    return limit ? sortedUsers.slice(0, limit) : sortedUsers;
  },*/

  readUserById(id: string) {
    return db.get(id);
  },

  update(id: string, user: User): User | null {
    if (db.has(id)) {
      const currUser = db.get(id);
      db.set(id, { ...currUser, ...user });
      return user;
    }

    return null;
  },

  delete(id: string): User | undefined {
    const user = db.get(id);
    if (user) {
      user.isDeleted = true;
    }

    return user;
  },

  /*  toUser({ external_id, is_deleted, ...rest }): User => ({
    id: external_id,
    isDeleted: is_deleted,
    ...rest
  });
}*/
};

export default userService;
