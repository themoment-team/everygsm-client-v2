import { ApiResponse } from '@/shared/types';

export type UserRoleType = 'USER' | 'ADMIN';

export interface UserType {
  id: number;
  email: string;
  name: string;
  studentNumber: string;
  role: UserRoleType;
}

export interface SearchedUserType {
  userId: number;
  name: string;
  studentNumber: string;
}

export interface UserSearchResponseType {
  users: SearchedUserType[];
}

export type UserInfoResponseType = ApiResponse<UserType>;

export type UserSearchResponseDataType = ApiResponse<UserSearchResponseType>;
