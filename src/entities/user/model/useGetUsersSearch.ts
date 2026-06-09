import { useQuery } from '@tanstack/react-query';

import { get, userQueryKeys, userUrl } from '@/shared/api';

import { UserSearchResponseType } from './types';

export const useGetUsersSearch = (name: string) => {
  const trimmedName = name.trim();

  return useQuery({
    queryKey: userQueryKeys.getUsersSearch(trimmedName),
    queryFn: () => get<UserSearchResponseType>(userUrl.getUsersSearch(trimmedName)),
    enabled: !!trimmedName,
  });
};
