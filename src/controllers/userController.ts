import { Request, Response } from 'express';
import userService from '../services/userServices';

const userController = {
  async create(req: Request, res: Response) {
    try {
      const { login, password, age, isDeleted } = req.body;
      const user = await userService.create({ login, password, age, isDeleted });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async read(req: Request, res: Response) {
    try {
      const users = await userService.readAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async readUserById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const user = await userService.readUserById(id);

      user ? res.json(user) : res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const { login, password, age, isDeleted } = req.body;
      const user = await userService.update(id, { login, password, age, isDeleted });
      if (user !== null) {
        res.status(204);
        res.json(user);
      }
    } catch {
      res.status(404);
      res.json({ message: 'User not fond' });
    }
  },

  delete(req: Request, res: Response): void {
    try {
      const id = req.params['id'];
      const user = userService.delete(id);
      res.json(user);
    } catch {
      res.status(404);
      res.json({ message: 'User not fond' });
    }
  },
};

export default userController;
