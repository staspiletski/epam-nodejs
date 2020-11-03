import { Request, Response } from 'express';
import userGroupService from '../services/userGroupServices';
import { logger } from "../logger/logger";
import { loggerFormat } from "../logger/utils";

const userGroupController = {
  async read(req: Request, res: Response) {
    try {
      const users = await userGroupService.readAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async readGroupById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const users = await userGroupService.readGroupById(id);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async readUserById(req: Request, res: Response) {
    try {
      const id = req.params['id'];
      const users = await userGroupService.readUserById(id);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { groupId, userIds } = req.body;
      const result = await userGroupService.create(groupId, userIds);
      res.status(201).json(result);
    } catch (error) {
      logger.error(loggerFormat(req, res), {message: error, methodName: 'userGroupController.create'});
      res.status(404).json(error.message);
    }
  },
};
export default userGroupController;
