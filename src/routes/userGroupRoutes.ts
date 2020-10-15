import { Router, Request, Response } from 'express';
import userGroupController from '../controllers/userGroupController';

const router: Router = Router();

// create group
router.post('/user-group', userGroupController.create);

export const userGroupRouter: Router = router;
