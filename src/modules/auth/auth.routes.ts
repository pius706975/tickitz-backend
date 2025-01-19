import express from 'express';
import authController from './auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', authController.signUp);
authRouter.put('/verify-account', authController.verifyAccount);
authRouter.post('/signin', authController.signIn);

export default authRouter;
