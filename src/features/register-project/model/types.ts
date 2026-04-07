import { ApiResponse } from '@/shared/types';

export interface PostImageUploadResponseData {
  key: string;
  imageUrl: string;
}

export type PostImageUploadResponse = ApiResponse<PostImageUploadResponseData>;
