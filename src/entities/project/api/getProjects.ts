import { projectUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';
import type { ProjectSortType } from '@/shared/types';

import { ProjectsListResponseType } from '../model/types';

export const getProjects = async (
  sort?: ProjectSortType,
): Promise<ProjectsListResponseType | undefined> => {
  return apiFetcher<ProjectsListResponseType>({
    endpoint: projectUrl.getProjects(sort),
    context: 'getProjects',
    errorMessage: '프로젝트 목록 조회 실패:',
  });
};
