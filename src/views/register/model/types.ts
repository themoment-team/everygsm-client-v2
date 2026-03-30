import { ApiResponse } from '@/shared/types';

export interface PostProjectLogoResponseData {
  key: string;
  imageUrl: string;
}

export type PostProjectLogoResponse = ApiResponse<PostProjectLogoResponseData>;
