import { userUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { UserResponseType } from '../model/types';

export const getMyInfo = async (): Promise<UserResponseType | undefined> => {
  return apiFetcher<UserResponseType>({
    endpoint: userUrl.getMyInfo(),
    context: 'getMyInfo',
    errorMessage: '내 정보 조회 실패',
  });
};
