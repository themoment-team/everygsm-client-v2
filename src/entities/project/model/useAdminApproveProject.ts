import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminQueryKeys, adminUrl, patch } from '@/shared/api';

import { ProjectResponseType } from './types';

export const useAdminApproveProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) =>
      patch<ProjectResponseType>(adminUrl.patchAdminApproveProject(projectId)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminQueryKeys.getAdminRequests() });
    },
  });
};
