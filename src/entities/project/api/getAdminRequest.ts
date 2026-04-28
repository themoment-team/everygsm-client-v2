import { adminUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { ProjectResponseType } from '../model/types';

export const getAdminRequest = async (id: number): Promise<ProjectResponseType | undefined> => {
  return apiFetcher<ProjectResponseType>({
    endpoint: adminUrl.getAdminRequest(id),
    context: 'getAdminRequest',
    errorMessage: '어드민 요청 상세 조회 실패',
  });
};
