import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  ProjectRegisterRegistrationType,
  ProjectResponseType,
} from '@/entities/project/model/types';
import { post, projectQueryKeys, projectUrl } from '@/shared/api';

export const usePostProjectRegistration = (
  options?: Omit<
    UseMutationOptions<ProjectResponseType, AxiosError, ProjectRegisterRegistrationType>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: projectQueryKeys.postProjectRegistration(),
    mutationFn: (data: ProjectRegisterRegistrationType) =>
      post<ProjectResponseType>(projectUrl.postProjectRegistration(), data),
    ...options,
  });
