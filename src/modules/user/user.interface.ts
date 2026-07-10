export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileImage?: string;
    address?: string;
    shopName?: string;
    role?: "CUSTOMER" | "PROVIDER" | "ADMIN";
    status?:"ACTIVE" | "SUSPENDED";
}
