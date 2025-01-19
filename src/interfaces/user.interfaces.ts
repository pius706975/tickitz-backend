export interface User {
    id?: string;
    firebase_id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    image?: string;
    role?: string;
    otp_code?: string;
    otp_expiration?: string;
    is_verified?: boolean;
    created_at: string | undefined;
    updated_at: string | undefined;
}
