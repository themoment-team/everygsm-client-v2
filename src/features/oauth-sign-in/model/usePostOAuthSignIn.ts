import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authUrl, post } from '@/shared/api';

import { OAuthSignInReqType, OAuthSignInResponseType } from './types';

export const usePostOAuthSignIn = (
  options?: Omit<
    UseMutationOptions<OAuthSignInResponseType, AxiosError, OAuthSignInReqType>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: (requestBody: OAuthSignInReqType) =>
      post<OAuthSignInResponseType>(authUrl.postSignIn(), requestBody),
    ...options,
  });
