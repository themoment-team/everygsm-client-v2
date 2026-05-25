import { userUrl } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import { UserSearchResponseDataType } from '../model/types';

export const getUsersSearch = async (
  name: string,
): Promise<UserSearchResponseDataType | undefined> => {
  if (!name) return undefined;

  return apiFetcher<UserSearchResponseDataType>({
    endpoint: userUrl.getUsersSearch(name),
    context: 'getUsersSearch',
    errorMessage: '사용자 검색 실패',
  });
};
