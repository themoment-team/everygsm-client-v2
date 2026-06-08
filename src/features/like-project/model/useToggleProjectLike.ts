import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ProjectResponseType } from '@/entities/project';
import { del, post, projectUrl } from '@/shared/api';

export const useToggleProjectLike = (
  projectId: number,
  options?: Omit<UseMutationOptions<ProjectResponseType, AxiosError, boolean>, 'mutationFn'>,
) =>
  useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked
        ? del<ProjectResponseType>(projectUrl.deleteProjectLike(projectId))
        : post<ProjectResponseType>(projectUrl.postProjectLike(projectId)),
    ...options,
  });
