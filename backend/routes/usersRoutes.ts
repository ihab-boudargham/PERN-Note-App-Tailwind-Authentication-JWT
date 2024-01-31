import { Router } from 'express';
import * as UsersController from '../controllers/usersController';
import { auth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', auth, UsersController.getAuthenticatedUser);
router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);
router.post('/logout', UsersController.logOut);

export default router;
