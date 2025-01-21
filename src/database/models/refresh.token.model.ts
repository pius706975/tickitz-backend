import { RefreshToken } from '@/interfaces/refresh.token.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type RefreshTokenCreationAttributes = Optional<
    RefreshToken,
    'id' | 'token'
>;

export class RefreshTokenModel
    extends Model<RefreshToken, RefreshTokenCreationAttributes>
    implements RefreshToken
{
    public id!: string;
    public user_id!: string;
    public token!: string;
    public expires_at!: string;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof RefreshTokenModel {
    RefreshTokenModel.init(
        {
            id: {
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.DATE,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'refresh-tokens',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return RefreshTokenModel;
}
