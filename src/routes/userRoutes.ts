import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import {
  limitValidationSchema,
  loginSubstringValidationSchema,
  userValidationSchema,
} from '../validation/schemas/userSchema';
import { validateRequest } from '../validation/userValidation';

const router: Router = Router();

// root server path
router.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// read users
router.get(
  '/user',
  validateRequest(limitValidationSchema, 'limit'),
  validateRequest(loginSubstringValidationSchema, 'substring'),
  userController.read,
);

// read user
router.get('/user/:id', (req: Request, res: Response) => {
  userController.readUserById(req, res);
});

// create user
router.post('/user', validateRequest(userValidationSchema), userController.create);

// update user
router.put('/user/:id', validateRequest(userValidationSchema), userController.update);

// delete user
router.delete('/user/:id', (req: Request, res: Response) => {
  userController.delete(req, res);
});

export const userRouter: Router = router;
