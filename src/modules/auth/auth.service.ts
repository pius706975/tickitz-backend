import { User } from '@/interfaces/user.interfaces';
import {
    validateSignIn,
    validateSignUp,
    validateVerifyAccount,
} from './auth.validator';
import { generateJWT, verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@/config';
import CustomError from '@/utils/custom-error';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import auth from '@/config/firebase.config';
import generateOTP from '@/utils/generate-otp';
import sendEmail from '@/utils/nodemailer';
import authRepo from './auth.repo';
import userRepo from '../user/user.repo';

const authService = {
    signUp: async (userData: User) => {
        const { error } = validateSignUp(userData);
        if (error) throw new CustomError(error.details[0].message, 400);

        const findUser = await userRepo.findUserByEmail(userData.email);
        if (findUser) throw new CustomError('Email already exists', 409);

        const firebaseResponse = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password as string,
        );

        const otpCode = generateOTP(6);
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

        const newUserData = await authRepo.createUser({
            ...userData,
            firebase_id: firebaseResponse.user.uid,
            otp_code: otpCode,
            otp_expiration: otpExpiration.toISOString(),
        });

        Promise.resolve()
            .then(() => {
                sendEmail(
                    userData.email,
                    'OTP verification code',
                    `Your OTP code.`,
                    'Use the following OTP code to complete your verification:',
                    `<h2>${otpCode}</h2>`,
                    'This code is valid for 10 minutes. Please do not share it with anyone.',
                    `If you didn't request this code, please ignore this email.`,
                    `${new Date().getFullYear().toString()}`,
                );
            })
            .catch(error => {
                console.log('Failed to send email: ', error);
            });

        return { user: newUserData };
    },

    verifyAccount: async (userData: User) => {
        const { error } = validateVerifyAccount(userData);
        if (error) throw new CustomError(error.details[0].message, 400);

        const user = await userRepo.findUserByEmail(userData.email);
        if (!user) throw new CustomError('User not found', 404);

        if (user.otp_code !== userData.otp_code)
            throw new CustomError('Invalid OTP code', 400);

        const otpExpirationDate = user.otp_expiration
            ? new Date(user.otp_expiration)
            : null;
        const otpExpired = otpExpirationDate && otpExpirationDate < new Date();

        if (otpExpired) throw new CustomError('OTP code has expired', 400);

        const verifiedUser = await userRepo.updateUser(user.id, {
            ...user,
            is_verified: true,
        });

        return verifiedUser;
    },

    signIn: async (userData: User) => {
        const { error } = validateSignIn(userData);
        if (error) throw new CustomError(error.details[0].message, 400);

        const user = await userRepo.findUserByEmail(userData.email);
        if (!user) throw new CustomError('Email or password is invalid', 401);

        const firebaseResponse = await signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password as string,
        );

        if (!firebaseResponse)
            throw new CustomError('Email or password is invalid', 401);

        if (!user.is_verified)
            throw new CustomError('User is not verified', 401);

        const payload = {
            userId: user.id,
        };

        const accessToken = await generateJWT(
            payload,
            JWT_ACCESS_TOKEN_SECRET as string,
            '5m',
        );

        const refreshToken = await generateJWT(
            payload,
            JWT_REFRESH_TOKEN_SECRET as string,
            '7d',
        );

        const refreshTokenExpiredAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
        );

        await authRepo.createRefreshToken(
            user.id!,
            refreshToken,
            refreshTokenExpiredAt.toISOString(),
        );

        return { user, accessToken, refreshToken };
    },

    refreshToken: async (userId: string, refreshToken: string) => {
        const user = await userRepo.findUserById(userId);
        if (!user) throw new CustomError('User not found', 404);

        const getRefreshToken = await authRepo.getRefreshToken(user.id!);
        if (!getRefreshToken || getRefreshToken.token !== refreshToken)
            throw new CustomError('Invalid refresh token', 401);

        const expiredAt = new Date(getRefreshToken.expires_at);
        if (expiredAt < new Date())
            throw new CustomError('Refresh token has expired', 401);

        const payload = {
            userId: user.id,
        };

        const newAccessToken = await generateJWT(
            payload,
            JWT_ACCESS_TOKEN_SECRET as string,
            '5m',
        );

        return { accessToken: newAccessToken };
    },

    signOut: async (accessToken: string, refreshToken: string) => {
        const decodeToken = await verifyJWT(
            accessToken,
            JWT_ACCESS_TOKEN_SECRET as string,
        );

        const userId = decodeToken.userId;

        const user = await userRepo.findUserById(userId);
        if (!user) throw new CustomError('User not found', 404);

        const deleteRefreshToken = await authRepo.deleteRefreshToken(
            user.id!,
            refreshToken,
        );
        if (!deleteRefreshToken)
            throw new CustomError('Refresh token not found', 404);

        return deleteRefreshToken;
    },
};

export default authService;
