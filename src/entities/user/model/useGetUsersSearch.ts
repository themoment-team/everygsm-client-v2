import { useQuery } from '@tanstack/react-query';

import { get, userQueryKeys, userUrl } from '@/shared/api';

import { UserSearchResponseType } from './types';

export const useGetUsersSearch = (name: string) =>
  useQuery({
    queryKey: userQueryKeys.getUsersSearch(name),
    queryFn: () => get<UserSearchResponseType>(userUrl.getUsersSearch(name)),
    enabled: !!name.trim(),
  });
