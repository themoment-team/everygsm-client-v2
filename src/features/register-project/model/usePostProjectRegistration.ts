import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { post, projectQueryKeys, projectUrl } from '@/shared/api';

import { ProjectRegistrationReqType, ProjectRegistrationResponseType } from './types';

export const usePostProjectRegistration = (
  options?: Omit<
    UseMutationOptions<ProjectRegistrationResponseType, AxiosError, ProjectRegistrationReqType>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: projectQueryKeys.postProjectRegistration(),
    mutationFn: (requestBody: ProjectRegistrationReqType) =>
      post<ProjectRegistrationResponseType>(projectUrl.postProjectRegistration(), requestBody),
    ...options,
  });
