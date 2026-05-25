import { useQuery } from '@tanstack/react-query';

import { get, userQueryKeys, userUrl } from '@/shared/api';

import { UserSearchResponseDataType } from './types';

export const useGetUsersSearch = (name: string) => {
  return useQuery({
    queryKey: userQueryKeys.getUsersSearch(name),
    queryFn: () => get<UserSearchResponseDataType>(userUrl.getUsersSearch(name)),
    enabled: !!name,
  });
};
