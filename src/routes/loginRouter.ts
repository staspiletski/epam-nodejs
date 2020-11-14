import express, { Router, Request, Response } from 'express';
import path from 'path';
import loginController from '../controllers/loginController';
import getLocalStore from '../storage/localStorage';

const localStore = getLocalStore();

const router: Router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/loginForm.html'));
});

router.get('/logout', (req: Request, res: Response) => {
  localStore.set('token', null);
  localStore.save();
  res.redirect('/');
});

// create application/x-www-form-urlencoded parser
const urlencodedParser = express.urlencoded({ extended: false });
router.post('/login', urlencodedParser, loginController.generateAccessToken);

export const loginRouter: Router = router;
