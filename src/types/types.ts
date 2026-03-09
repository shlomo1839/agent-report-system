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


export type ReportCategory = 'intelligence' | 'logistics' | 'alert';
export type ReportUrgency = 'low' | 'medium' | 'high';


export interface Report {
    id: string;
    userId: string;
    category: ReportCategory;
    urgency: ReportUrgency;
    message: string;
    imagePath?: string;
    sourceType: 'csv';
    createdAt: Date;
}