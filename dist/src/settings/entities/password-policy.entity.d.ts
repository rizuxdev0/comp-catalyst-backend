export declare class PasswordPolicy {
    id: string;
    min_length: number;
    require_uppercase: boolean;
    require_lowercase: boolean;
    require_digit: boolean;
    require_special_char: boolean;
    temp_password_expiry_hours: number;
    created_at: Date;
    updated_at: Date;
}
