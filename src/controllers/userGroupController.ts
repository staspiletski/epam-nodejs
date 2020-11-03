import { Request, Response } from 'express';
import userGroupService from '../services/userGroupServices';
import { logger } from "../logger/logger";
import { loggerFormat } from "../logger/utils";

const userGroupController = {
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
