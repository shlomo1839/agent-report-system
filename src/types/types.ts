export type AgentRole =  'admin' | 'agent';

export interface Agent {
    id: string;
    agentCode: string;
    fullName: string;
    password: string;
    role: AgentRole;
}

export interface AuthPayload {
    userId: string;
    agentCode: string;
    role: AgentRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
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
