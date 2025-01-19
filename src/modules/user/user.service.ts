import CustomError from '@/utils/custom-error';
import { verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';
import userRepo from './user.repo';
import generateOTP from '@/utils/generate-otp';
import sendEmail from '@/utils/nodemailer';

const userService = {
    sendOTP: async (email: string) => {
        const user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new CustomError('User not found', 404);
        }

        const otpCode = generateOTP(6);
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

        const updatedUser = await userRepo.updateUser(user.id, {
            ...user,
            otp_code: otpCode,
            otp_expiration: otpExpiration.toISOString(),
        });

        Promise.resolve().then(()=>{
            sendEmail(
                email,
                'OTP verification code',
                `Your OTP code.`,
                'Use the following OTP code to complete your verification:',
                `<h2>${otpCode}</h2>`,
                'This code is valid for 10 minutes. Please do not share it with anyone.',
                `If you didn't request this code, please ignore this email.`,
                `${new Date().getFullYear().toString()}`,
            );
        }).catch((error) => {
            console.log('Failed to send otp', error);
        });

        return updatedUser;
    },

    getUserProfile: async (accessToken: string) => {
        const decodeToken = await verifyJWT(
            accessToken,
            JWT_ACCESS_TOKEN_SECRET as string,
        );

        const userId = decodeToken.userId;

        const user = await userRepo.getUserProfile(userId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }

        return user;
    },
};

export default userService;
