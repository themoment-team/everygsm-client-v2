import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { imageQueryKeys, imageUrl, post } from '@/shared/api';

import { ImageUploadReqType, ImageUploadResponseType } from './types';

export const usePostImageUpload = (
  options?: Omit<
    UseMutationOptions<ImageUploadResponseType, AxiosError, ImageUploadReqType>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: imageQueryKeys.postImageUpload(),
    mutationFn: ({ image }: ImageUploadReqType) => {
      const formData = new FormData();
      formData.append('image', image);

      return post<ImageUploadResponseType>(imageUrl.postImageUpload(), formData);
    },
    ...options,
  });
