import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import {
  limitValidationSchema,
  loginSubstringValidationSchema,
  userValidationSchema,
} from '../validation/schemas/useSchema';
import { validateRequest } from '../validation/userValidation';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

router.get(
  '/user',
  validateRequest(limitValidationSchema, 'limit'),
  validateRequest(loginSubstringValidationSchema, 'substring'),
  userController.read,
);

router.get('/user/:id', (req: Request, res: Response) => {
  userController.readUserById(req, res);
});

router.post('/user', validateRequest(userValidationSchema), userController.create);

router.put('/user/:id', validateRequest(userValidationSchema), userController.update);

router.delete('/user/:id', (req: Request, res: Response) => {
  userController.delete(req, res);
});

export const userRouter: Router = router;
