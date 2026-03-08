export interface User {
    id: string;
    agentCode: string;
    fullName: string;
    passwordHash: string;
    role: 'admin' | 'agent';
    createdAt: Date;
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

