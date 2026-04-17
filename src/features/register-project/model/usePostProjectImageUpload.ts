import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { imageUrl, post, projectQueryKeys } from '@/shared/api';

import { PostImageUploadResponse } from './types';

export const usePostProjectImageUpload = (
  options?: Omit<
    UseMutationOptions<PostImageUploadResponse, AxiosError, FormData>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: projectQueryKeys.postProjectLogo(),
    mutationFn: (data: FormData) => post<PostImageUploadResponse>(imageUrl.postImageUpload(), data),
    ...options,
  });
