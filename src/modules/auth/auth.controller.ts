import { NextFunction, Request, Response } from 'express';
import authService from './auth.service';
import { refreshToken } from 'firebase-admin/app';
import { signOut } from 'firebase/auth';

const authController = {
    signUp: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userData = req.body;
            const response = await authService.signUp(userData);

            res.status(201).json({
                message: 'Successfully signed up',
                data: response.user,
            });
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                res.status(409).json({
                    error: 'Email already exists',
                });
            }

            next(error);
        }
    },

    verifyAccount: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userData = req.body;
            await authService.verifyAccount(userData);

            res.status(201).json({
                message: 'Account verified successfully',
            });
        } catch (error) {
            next(error);
        }
    },

    signIn: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userData = req.body;
            const response = await authService.signIn(userData);

            res.status(200).json({
                message: 'Successfully signed in',
                data: response,
            });
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                res.status(401).json({
                    error: 'Email or password is invalid',
                });
            }
            next(error);
        }
    },

    refreshToken: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { user_id, refresh_token } = req.body;
            const response = await authService.refreshToken(
                user_id,
                refresh_token,
            );

            res.status(200).json({
                message: 'Access token refreshed successfully',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    },

    signOut: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const accessToken = authorization.split(' ')[1];
            const { refresh_token } = req.body;

            await authService.signOut(accessToken, refresh_token);

            res.status(200).json({
                message: 'Signed out successfully',
            });
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
