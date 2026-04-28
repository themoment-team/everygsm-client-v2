import { projectUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { ProjectResponseType } from '../model/types';

export const getMyProject = async (id: number): Promise<ProjectResponseType | undefined> => {
  return apiFetcher<ProjectResponseType>({
    endpoint: projectUrl.getMyProject(id),
    context: 'getMyProject',
    errorMessage: '마이페이지 프로젝트 조회 실패:',
    returnErrorBody: true,
  });
};
