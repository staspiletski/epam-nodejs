import { Request, Response } from 'express';
import { logger } from '../logger/logger';
import { loggerFormat } from '../logger/utils';
import loginServices from '../services/loginServices';

const loginController = {
  async generateAccessToken(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const token = await loginServices.generateAccessToken(login, password);
      if (token) {
        res.json(token);
        logger.info('Controller GenerateAccessToken:', token);
      } else {
        res.status(403).json({ message: 'Incorrect login' });
      }
    } catch (error) {
      logger.error(loggerFormat(req, res), {
        message: error,
        methodName: 'loginController.generateAccessToken',
      });
    }
  },
};

export default loginController;
