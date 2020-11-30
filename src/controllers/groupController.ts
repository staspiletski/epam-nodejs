import { Request, Response } from 'express';
import groupService from '../services/groupServices';
import { logger } from '../logger/logger';
import { loggerFormat } from '../logger/utils';
import userGroupService from '../services/userGroupServices';

const groupController = {
  async create(req: Request, res: Response) {
    try {
      const { name, permissions } = req.body;
      const group = await groupService.create({ name, permissions });
      res.status(201).json(group);
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'groupController.create',
      });
      res.status(404).json(error.message);
    }
  },

  async read(req: Request, res: Response) {
    try {
      const groups = await groupService.readAll();
      res.status(200).json(groups);
    } catch (error) {
      logger.error(loggerFormat(req, res), { message: error, methodName: 'groupController.read' });
      res.status(404).json(error.message);
    }
  },

  async readGroupById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const group = await groupService.readGroupById(id);
      group ? res.status(200).json(group) : res.status(404).json('Group not found');
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'groupController.readGroupById',
      });
      res.status(404).json(error.message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const { name, permissions } = req.body;
      const group = await groupService.update(id, { name, permissions });
      group ? res.status(200).json(group) : res.status(404).json('Group not found');
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'groupController.update',
      });
      res.status(404).json({ message: 'Group not fond' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const group = await groupService.delete(id);
      res.status(200).json(group);
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'groupController.delete',
      });
      res.status(404).json({ message: 'Group not fond' });
    }
  },
};

export default groupController;
