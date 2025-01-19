export interface RefreshToken {
    id: string;
    user_id: string;
    token: string;
    expires_at: string;
    created_at: string | undefined;
    updated_at: string | undefined;
}