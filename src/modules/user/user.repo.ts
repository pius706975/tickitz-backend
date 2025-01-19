import { DB } from '@/database';
import { User } from '@/interfaces/user.interfaces';

const userRepo = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        return await DB.Users.findOne({ where: { email } });
    },

    findUserById: async (userId: string): Promise<User | null> => {
        return await DB.Users.findOne({ where: { id: userId } });
    },

    getUserProfile: async (
        userId: string | undefined,
    ): Promise<User | null> => {
        return await DB.Users.findOne({ where: { id: userId } });
    },

    updateUser: async (userId: string | undefined, userData: User) => {
        return await DB.Users.update(userData, { where: { id: userId } });
    },
};

export default userRepo;
