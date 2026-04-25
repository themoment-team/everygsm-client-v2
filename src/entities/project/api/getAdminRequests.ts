import { adminUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { ProjectsListResponseType } from '../model/types';

export const getAdminRequests = async (): Promise<ProjectsListResponseType | undefined> => {
  return apiFetcher<ProjectsListResponseType>({
    endpoint: adminUrl.getAdminRequests(),
    context: 'getAdminRequests',
    errorMessage: '어드민 요청 목록 조회 실패',
  });
};
