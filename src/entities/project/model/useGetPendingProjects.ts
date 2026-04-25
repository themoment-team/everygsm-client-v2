import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, get } from '@/shared/api';
import { minutesToMs } from '@/shared/utils';

import { ProjectsListResponseType } from './types';

export const useGetPendingProjects = (
  options?: Omit<UseQueryOptions<ProjectsListResponseType>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    queryKey: adminQueryKeys.getAdminRequests(),
    queryFn: () => get<ProjectsListResponseType>(adminUrl.getAdminRequests()),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    ...options,
  });
