import { ApiResponse } from '@/shared/types';

export type StatusType = 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE';

export interface TechStackType {
  stackName: string;
}

export interface ProjectRepositoryReqType {
  repoUrl: string;
}

export interface ProjectRepositoryType {
  repoName: string;
  repoUrl: string;
}

export interface ProjectType {
  projectId: number;
  logo: string;
  title: string;
  affiliation: string;
  description: string;
  prodUrl: string;
  status: StatusType;
  reason: string;
  createdAt: string;
  techStack: TechStackType[];
  repository: ProjectRepositoryType[];
  liked: boolean;
}

export interface ProjectRegisterReqType {
  logo: string;
  title: string;
  affiliation: string;
  description: string;
  prodUrl: string;
  techStack: TechStackType[];
  repository: ProjectRepositoryReqType[];
}

export type ProjectResponseType = ApiResponse<ProjectType>;

export interface ProjectsListType {
  projects: ProjectType[];
}

export type ProjectsListResponseType = ApiResponse<ProjectsListType>;

export interface MyProjectsType {
  liked: ProjectType[];
  registered: ProjectType[];
}

export type MyProjectsListResponseType = ApiResponse<MyProjectsType>;
