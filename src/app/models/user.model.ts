export interface User {
  id: number;
  userIdentifier: string;
  firstName: string;
  lastName: string;
  username: string;
  description: string;
  phone: string;
  email: string;
  work: string;
  reward: number;
  lastLoginDate: Date | string;
  lastLoginDateDisplay: Date | string;
  joinDate: Date | string;
  profileImageUrl: string;
  active: boolean;
  notLocked: boolean;
  role: string;
  authorities: [];
}
