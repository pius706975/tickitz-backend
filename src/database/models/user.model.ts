import { User } from '@/interfaces/user.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type UserCreationAttributes = Optional<
    User,
    'id' | 'email' 
>;

export class UserModel
    extends Model<User, UserCreationAttributes>
    implements User
{
    public id!: string;
    public email!: string;
    public first_name!: string;
    public last_name!: string;
    public image?: string;
    public otp_code?: string;
    public otp_expiration?: string;
    public is_verified?: boolean;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            first_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            last_name: {
                allowNull: true,
                type: DataTypes.STRING,
                unique: true,
            },
            image: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            otp_code: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            otp_expiration: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            is_verified: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'users',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return UserModel;
}
