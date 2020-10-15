import { Router, Request, Response } from 'express';
import { validateRequest } from '../validation/userValidation';
import groupController from '../controllers/groupController';
import { groupValidationSchema } from '../validation/schemas/groupSchema';

const router: Router = Router();

// read group
router.get('/group', groupController.read);

// read group
router.get('/group/:id', (req: Request, res: Response) => {
  groupController.readGroupById(req, res);
});

// create group
router.post('/group', validateRequest(groupValidationSchema), groupController.create);

// update group
router.put('/group/:id', validateRequest(groupValidationSchema), groupController.update);

// delete group
router.delete('/group/:id', (req: Request, res: Response) => {
  groupController.delete(req, res);
});

export const groupRouter: Router = router;
