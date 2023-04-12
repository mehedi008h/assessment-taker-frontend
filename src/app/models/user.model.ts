export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  lastLoginDate: Date | string;
  lastLoginDateDisplay: Date | string;
  joinDate: Date | string;
  profileImageUrl: string;
  active: boolean;
  notLocked: boolean;
  role: string;
  authorities: [];
}
