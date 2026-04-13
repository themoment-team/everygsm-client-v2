import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { imageQueryKeys, imageUrl, post } from '@/shared/api';

import { PostImageUploadResponse } from './types';

export const usePostProjectImageUpload = (
  options?: Omit<
    UseMutationOptions<PostImageUploadResponse, AxiosError, FormData>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: imageQueryKeys.postImageUpload(),
    mutationFn: (data: FormData) => post<PostImageUploadResponse>(imageUrl.postImageUpload(), data),
    ...options,
  });
