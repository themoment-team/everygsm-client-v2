import { ApiResponse } from '@/shared/types';

export type UserRoleType = 'USER' | 'ADMIN';

export interface UserType {
  id: number;
  email: string;
  name: string;
  studentNumber: string | null;
  role: UserRoleType;
}

export type UserResponseType = ApiResponse<UserType>;

export type AccountRoleType = UserRoleType;
export type UserInfoType = UserType;
export type UserInfoResponseType = UserResponseType;
