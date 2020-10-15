import { Request, Response } from 'express';
import userGroupService from '../services/userGroupServices';

const userGroupController = {
  async create(req: Request, res: Response) {
    try {
      const { groupId, userIds } = req.body;
      const result = await userGroupService.create(groupId, userIds);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message);
    }
  },
};
export default userGroupController;
