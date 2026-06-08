import { useMutation } from '@tanstack/react-query';

import { adminUrl, patch } from '@/shared/api';

import { ProjectResponseType } from './types';

export const useAdminRejectProject = () =>
  useMutation({
    mutationFn: ({ projectId, reason }: { projectId: number; reason: string }) =>
      patch<ProjectResponseType>(adminUrl.patchAdminRejectProject(projectId), { reason }),
  });
