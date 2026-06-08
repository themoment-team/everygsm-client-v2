import { useMutation } from '@tanstack/react-query';

import { adminUrl, patch } from '@/shared/api';

import { ProjectResponseType } from './types';

export const useAdminApproveProject = () =>
  useMutation({
    mutationFn: (projectId: number) =>
      patch<ProjectResponseType>(adminUrl.patchAdminApproveProject(projectId)),
  });
