import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, patch } from '@/shared/api';

import { ProjectResponseType } from './types';

export const useAdminRejectProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, reason }: { projectId: number; reason: string }) =>
      patch<ProjectResponseType>(adminUrl.patchAdminRejectProject(projectId), { reason }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.getAdminRequests() });
    },
  });
};
