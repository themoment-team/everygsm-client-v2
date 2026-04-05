import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { imageQueryKeys, imageUrl, post } from '@/shared/api';

import { PostProjectLogoResponse } from './types';

export const usePostProjectLogo = (
  options?: Omit<
    UseMutationOptions<PostProjectLogoResponse, AxiosError, FormData>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: imageQueryKeys.postImageUpload(),
    mutationFn: (data: FormData) => post<PostProjectLogoResponse>(imageUrl.postImageUpload(), data),
    ...options,
  });
