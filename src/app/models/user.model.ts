 export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'company-admin';
    companyId?: number;
  }
  