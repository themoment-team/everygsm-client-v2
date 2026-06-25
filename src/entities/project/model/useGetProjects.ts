import { keepPreviousData, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { get, projectQueryKeys, projectUrl } from '@/shared/api';
import type { ProjectSortType } from '@/shared/types';
import { minutesToMs } from '@/shared/utils';

import { ProjectsListResponseType } from './types';

export const useGetProjects = (
  sort?: ProjectSortType,
  options?: Omit<UseQueryOptions<ProjectsListResponseType>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    queryKey: projectQueryKeys.getProjects(sort),
    queryFn: () => get<ProjectsListResponseType>(projectUrl.getProjects(sort)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(10),
    placeholderData: keepPreviousData,
    ...options,
  });
