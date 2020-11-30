import { Router } from 'express';
import userGroupController from '../controllers/userGroupController';

const router: Router = Router();

// read group
router.get('/user-group', userGroupController.read);

// read group by id
router.get('/user-group/group/:id', userGroupController.readGroupById);

// read user by id
router.get('/user-group/user/:id', userGroupController.readUserById);

// create group
router.post('/user-group', userGroupController.create);

export const userGroupRouter: Router = router;
