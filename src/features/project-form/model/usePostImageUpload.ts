import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { imageUrl, post } from '@/shared/api';

import { ImageUploadReqType, ImageUploadResponseType } from './types';

export const usePostImageUpload = (
  options?: Omit<
    UseMutationOptions<ImageUploadResponseType, AxiosError, ImageUploadReqType>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: ({ image }: ImageUploadReqType) => {
      const formData = new FormData();
      formData.append('image', image);

      return post<ImageUploadResponseType>(imageUrl.postImageUpload(), formData);
    },
    ...options,
  });
