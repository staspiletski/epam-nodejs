import { logger } from '../logger/logger';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import getLocalStore from '../storage/localStorage';
import { SECRET_KEY } from '../config';

const localStore = getLocalStore();

const loginServices = {
  async generateAccessToken(login: string, password: string) {
    try {
      const user = await UserModel.findOne({ where: { login: login, password: password } });
      const dataValues = user?.getDataValue;

      if (dataValues) {
        // @ts-ignore
        let payload = { sub: dataValues.id, isDeleted: dataValues.isDeleted };
        // @ts-ignore
        let token = jwt.sign(payload, SECRET_KEY, { expiresIn: 1800 });
        localStore.set('token', token);
        localStore.save();
        return token;
      } else {
        logger.error('User does not exist');
        localStore.set('token', null);
        localStore.save();
        return null;
      }
    } catch (e) {
      logger.error(`Login failed: ${e}`);
    }
  },

  isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/login') {
      next();
      return;
    }

    const token = req.headers['authorization'] as string;
    console.log(' isAuthenticated ', req.headers['authorization']);
    if (token) {
      // @ts-ignore
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          logger.error('isAuthenticated err: ', err);
          return res.status(403).send({ success: false, message: 'Invalid JWT token' });
        }

        // @ts-ignore
        req.login = decoded.login;
        // @ts-ignore
        req.password = decoded.password;
        next();
      });
    } else {
      return res
        .status(401)
        .send(
          'There is no token, please log in at <a href="http://localhost:4500/login">Login page</a>',
        );
    }
  },
};

export default loginServices;
