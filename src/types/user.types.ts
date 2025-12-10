export type UserRole = 'admin' | 'hr' | 'employee' | 'manager';
export type UserStatus = 'active' | 'inactive' | 'on_leave';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    department: string;
    designation: string;
    status: UserStatus;
    joinDate: string;
    phoneNumber?: string;
    avatar?: string;
}

export interface UserFilters {
    role?: UserRole;
    department?: string;
    status?: UserStatus;
    search?: string;
}
