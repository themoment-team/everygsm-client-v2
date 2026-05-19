import { userUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { UserInfoResponseType } from '../model/types';

export const getMyInfo = async (): Promise<UserInfoResponseType | undefined> => {
  return apiFetcher<UserInfoResponseType>({
    endpoint: userUrl.getMyInfo(),
    context: 'getMyInfo',
    errorMessage: '내 정보 조회 실패',
  });
};
