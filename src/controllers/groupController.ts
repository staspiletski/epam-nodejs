import { Request, Response } from 'express';
import groupService from '../services/groupServices';

const groupController = {
  async create(req: Request, res: Response) {
    try {
      const { name, permissions } = req.body;
      const group = await groupService.create({ name, permissions });
      res.status(201).json(group);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async read(req: Request, res: Response) {
    try {
      const groups = await groupService.readAll();
      res.status(200).json(groups);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async readGroupById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const group = await groupService.readGroupById(id);

      group ? res.json(group) : res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const { name, permissions } = req.body;
      const group = await groupService.update(id, { name, permissions });
      if (group !== null) {
        res.status(204);
        res.json(group);
      }
    } catch {
      res.status(404);
      res.json({ message: 'Group not fond' });
    }
  },

  delete(req: Request, res: Response): void {
    try {
      const id = req.params['id'];
      const group = groupService.delete(id);
      res.json(group);
    } catch {
      res.status(404);
      res.json({ message: 'Group not fond' });
    }
  },
};

export default groupController;
