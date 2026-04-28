import { ProjectType } from '@/entities/project';
import { ApiResponse } from '@/shared/types';

export type { ImageUploadReqType, ProjectRegistrationReqType, TechStackReqType } from './schema';

export interface ImageUploadType {
  key: string;
  imageUrl: string;
}

export type ImageUploadResponseType = ApiResponse<ImageUploadType>;

export type ProjectRegistrationResponseType = ApiResponse<ProjectType>;
