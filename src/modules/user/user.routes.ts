import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import userController from './user.controller';

const userRouter = express.Router();

userRouter.get('/profile', authMiddleware, userController.getUserProfile);

userRouter.put('/send-otp', userController.sendOTP);

export default userRouter;
