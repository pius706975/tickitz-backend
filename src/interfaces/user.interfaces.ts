export interface User {
    id?: string;
    email: string;
    first_name: string;
    last_name: string;
    image?: string;
    otp_code?: string;
    otp_expiration?: string;
    is_verified?: boolean;
    created_at: string | undefined;
    updated_at: string | undefined;
}
