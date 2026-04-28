import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, get } from '@/shared/api';
import { minutesToMs } from '@/shared/utils';

import { ProjectResponseType } from './types';

export const useGetAdminRequest = (
  requestId?: number,
  options?: Omit<UseQueryOptions<ProjectResponseType>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    queryKey: adminQueryKeys.getAdminRequest(requestId),
    queryFn: () => get<ProjectResponseType>(adminUrl.getAdminRequest(requestId!)),
    enabled: Boolean(requestId),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
