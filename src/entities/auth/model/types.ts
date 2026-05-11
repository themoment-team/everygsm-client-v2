import { ApiResponse } from '@/shared/types';

export interface OAuthSignInReqType {
  authCode: string;
  redirectUri: string;
  codeVerifier: string;
}

export interface OAuthSignInType {
  accessToken: string;
}

export type OAuthSignInResponseType = ApiResponse<OAuthSignInType>;

export type AccountRoleType = 'ADMIN' | 'USER';

export interface UserInfoType {
  id: number;
  email: string;
  name: string;
  studentNumber: string;
  role: AccountRoleType;
}

export type UserInfoResponseType = ApiResponse<UserInfoType>;
