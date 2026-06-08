import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { authQueryKeys, get, userUrl } from '@/shared/api';
import { minutesToMs } from '@/shared/utils';

import { UserInfoResponseType } from './types';

export const useGetMyInfo = (
  options?: Omit<UseQueryOptions<UserInfoResponseType>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    queryKey: authQueryKeys.getMyInfo(),
    queryFn: () => get<UserInfoResponseType>(userUrl.getMyInfo()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
