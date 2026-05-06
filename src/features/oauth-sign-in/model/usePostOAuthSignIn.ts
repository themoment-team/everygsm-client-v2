import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authQueryKeys, authUrl, post } from '@/shared/api';

import { OAuthSignInReqType, OAuthSignInResponseType } from './types';

export const usePostOAuthSignIn = (
  options?: Omit<
    UseMutationOptions<OAuthSignInResponseType, AxiosError, OAuthSignInReqType>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: authQueryKeys.postSignIn(),
    mutationFn: (requestBody: OAuthSignInReqType) =>
      post<OAuthSignInResponseType>(authUrl.postSignIn(), requestBody),
    ...options,
  });
