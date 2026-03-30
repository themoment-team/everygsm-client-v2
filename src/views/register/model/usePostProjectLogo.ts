import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { post, projectQueryKeys, projectUrl } from '@/shared/api';

import { PostProjectLogoResponse } from './types';

export const usePostProjectLogo = (
  options?: Omit<
    UseMutationOptions<PostProjectLogoResponse, AxiosError, FormData>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: projectQueryKeys.postProjectLogo(),
    mutationFn: (data: FormData) =>
      post<PostProjectLogoResponse>(projectUrl.postProjectLogo(), data),
    ...options,
  });
