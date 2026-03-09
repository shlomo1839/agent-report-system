export type UserRole =  'admin' | 'agent';

export interface User {
    id: string;
    agentCode: string;
    fullName: string;
    passwordHash: string;
    role: UserRole
    createdAt: Date;
}


export interface AuthPayload {
    userId: string;
    agentCode: string;
    role: UserRole;
}





export interface Report {
    id: string;
    userId: string;
    category: 'intelligence' | 'logistics' | 'alert';
    urgency: 'low' | 'medium' | 'high';
    message: string;
    imagePath?: string;
    sourceType: 'csv';
    createdAt: Date;
}




