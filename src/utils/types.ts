export interface IUser {
    id?: number;
    username: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    profileImageURL?: string | null;
    role: "MEMBER" | "ADMIN";
    isActive: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date
}