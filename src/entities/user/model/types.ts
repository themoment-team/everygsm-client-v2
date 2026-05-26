import { ApiResponse } from '@/shared/types';

export type UserRoleType = 'USER' | 'ADMIN';

export interface UserType {
  id: number;
  email: string;
  name: string;
  studentNumber: string;
  role: UserRoleType;
}

export interface UserSummaryType {
  userId: number;
  name: string;
  studentNumber: string;
}

export interface UserSearchType {
  users: UserSummaryType[];
}

export type UserInfoResponseType = ApiResponse<UserType>;

export type UserSearchResponseType = ApiResponse<UserSearchType>;
