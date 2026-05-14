import { ApiResponse } from '@/shared/types';

export type UserRoleType = 'USER' | 'ADMIN';

export interface UserType {
  id: number;
  email: string;
  name: string;
  studentNumber: string;
  role: UserRoleType;
}

export type UserInfoResponseType = ApiResponse<UserType>;
