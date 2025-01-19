import express from 'express';
import authController from './auth.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.put('/verify-account', authController.verifyAccount);
authRouter.post('/signin', authController.signIn);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/signout', authMiddleware, authController.signOut);

export default authRouter;
