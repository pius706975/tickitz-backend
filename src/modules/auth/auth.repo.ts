import { DB } from '@/database';
import { User } from '@/interfaces/user.interfaces';

const authRepo = {
    createUser: async (userData: User): Promise<User> => {
        return await DB.Users.create(userData);
    },
};

export default authRepo;
