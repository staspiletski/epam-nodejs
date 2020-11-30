import { Router } from 'express';
import errorController from '../controllers/errorController';

const router: Router = Router();

// Unhandled Rejection
router.get('/error-rejection', errorController.createUnhandledRejectionError);

// Uncaught Exception
router.get('/error-exception', errorController.createUncaughtException);

export const errorRouter: Router = router;
