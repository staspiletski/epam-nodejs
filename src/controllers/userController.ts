import { Request, Response } from 'express';
import userService from '../services/userServices';
import { logger } from '../logger/logger';
import { loggerFormat } from '../logger/utils';

const userController = {
  async create(req: Request, res: Response) {
    try {
      console.log(' CREATE 1 ', req.body);
      const { login, password, age, isDeleted } = req.body;
      console.log(' CREATE 2 ', req.body);
      const user = await userService.create({ login, password, age, isDeleted });
      res.status(201).json(user);
    } catch (error) {
      logger.error(loggerFormat(req, res), { message: error, methodName: 'userController.create' });
      res.status(404).json(error.message);
    }
  },

  async read(req: Request, res: Response) {
    try {
      const users = await userService.readAll();
      res.status(200).json(users);
    } catch (error) {
      logger.error(loggerFormat(req, res), { message: error, methodName: 'userController.read' });
      res.status(404).json(error.message);
    }
  },

  async readUserById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const user = await userService.readUserById(id);
      user ? res.status(200).json(user) : res.status(404).json('User not found');
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'userController.readUserById',
      });
      res.status(404).json(error.message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const { login, password, age, isDeleted } = req.body;
      const user = await userService.update(id, { login, password, age, isDeleted });
      user ? res.status(200).json(user) : res.status(404).json('User not found');
    } catch (error) {
      logger.error(loggerFormat(req, res), { message: error, methodName: 'userController.update' });
      res.status(404).json({ message: 'User not fond' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const user = await userService.delete(id);
      res.status(200).json(user);
    } catch (error) {
      logger.error(loggerFormat(req, res), { message: error, methodName: 'userController.delete' });
      res.status(404).json({ message: 'User not fond' });
    }
  },
};

export default userController;
