import { Request, Response } from 'express';
import userService from '../services/userServices';

const userController = {
  create(req: Request, res: Response): void {
    const user = userService.create(req.body);

    if (!!user) {
      res.status(201);
      res.json(user);
    }
  },

  async read(req: Request, res: Response) {
    await res.json(userService.readAll());
  },

  readUserById(req: Request, res: Response): void {
    const id = req.params['id'];
    const user = userService.readUserById(id);

    user ? res.json(user) : res.sendStatus(404);
  },

  update(req: Request, res: Response): void {
    const id = req.params['id'];
    const body = req.body;
    const user = userService.update(id, body);
    if (user !== null) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({ message: 'User not fond' });
    }
  },

  delete(req: Request, res: Response): void {
    const id = req.params['id'];
    const user = userService.delete(id);
    res.json(user);
  },
};

export default userController;
