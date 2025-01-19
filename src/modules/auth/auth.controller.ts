import { NextFunction, Request, Response } from 'express';
import authService from './auth.service';

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
};

export default authController;
