import { DB } from '@/database';
import { User } from '@/interfaces/user.interfaces';

const authRepo = {
    createUser: async (userData: User): Promise<User> => {
        return await DB.Users.create(userData);
    },

    createRefreshToken: async (
        userId: string,
        refreshToken: string,
        expiresAt: string,
    ) => {
        return await DB.RefreshTokens.create({
            user_id: userId,
            token: refreshToken,
            expires_at: expiresAt,
        });
    },

    getRefreshToken: async (userId: string) => {
        return await DB.RefreshTokens.findOne({ where: { user_id: userId } });
    },

    deleteRefreshToken: async (userId: string, refreshToken: string) => {
        return await DB.RefreshTokens.update(
            {
                token: '',
            },
            {
                where: { user_id: userId, token: refreshToken },
            }
        );
    },
};

export default authRepo;
