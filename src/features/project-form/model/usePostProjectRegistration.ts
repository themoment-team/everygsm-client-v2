import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { post, projectQueryKeys, projectUrl } from '@/shared/api';

import { ProjectRegistrationReqType, ProjectRegistrationResponseType } from './types';

export const usePostProjectRegistration = (
  options?: Omit<
    UseMutationOptions<ProjectRegistrationResponseType, AxiosError, ProjectRegistrationReqType>,
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: ProjectRegistrationReqType) =>
      post<ProjectRegistrationResponseType>(projectUrl.postProjectRegistration(), requestBody),
    ...options,
    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyProjects() }),
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.getMyPendingProjects() }),
      ]);
      await options?.onSuccess?.(...args);
    },
  });
};
