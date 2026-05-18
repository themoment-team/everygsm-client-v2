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
