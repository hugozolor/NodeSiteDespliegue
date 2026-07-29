export type UserRole = 'GUEST' | 'USER' | 'ADMIN';

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: UserRole;
  token?: string;
}